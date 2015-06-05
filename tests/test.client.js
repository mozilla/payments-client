'use strict';

var PaymentsClient = require('payments-client');
var helpers = require('helpers');

describe('Test client options', function() {

  it('should allow only https by default', function() {
    assert.throw(function() {
      /*eslint-disable no-new */
      new PaymentsClient();
    }, Error, /paymentHost is not https/);
  });

  it('should throw if not http or https', function() {
    assert.throw(function() {
      /*eslint-disable no-new, no-script-url */
      new PaymentsClient({
        httpsOnly: false,
        paymentHost: 'javascript:alert(\'foo\')',
      });
    }, Error, /paymentHost must be http or https/);
  });

  it('should throw if missing product name', function() {
    assert.throw(function() {
      /*eslint-disable no-new */
      new PaymentsClient({
        httpsOnly: false,
      });
    }, Error, /A 'product' string must/);
  });

  it('should throw if missing an accessToken name', function() {
    assert.throw(function() {
      /*eslint-disable no-new */
      new PaymentsClient({
        httpsOnly: false,
        product: 'whatever',
      });
    }, Error, /An 'accessToken' string must/);
  });

});

describe('Test client', function() {

  beforeEach(function() {
    this.modalParent = document.createElement('div');
    this.client = new PaymentsClient({
      httpsOnly: false,
      modalParent: this.modalParent,
      closeDelayMs: 0,
      product: 'something-awesome',
      accessToken: 'blah-blah-access-token-blah',
    });
    sinon.spy(this.client, 'close');
    this.getByPrefixedClass = function(classSuffix) {
      var className = '.' + this.client.prefix(classSuffix);
      return this.modalParent.querySelector(className);
    };
    this.getAllByPrefixedClass = function(classSuffix) {
      var className = '.' + this.client.prefix(classSuffix);
      return this.modalParent.querySelectorAll(className);
    };
  });

  afterEach(function() {
    this.modalParent.innerHTML = '';
    this.client.close.restore();
  });

  it('should be available via require', function() {
    assert.ok(PaymentsClient);
  });

  it('should have a container', function() {
    this.client.show();
    assert.equal(this.getAllByPrefixedClass('container').length, 1);
  });

  it('should have a modal', function() {
    this.client.show();
    assert.equal(this.getAllByPrefixedClass('modal').length, 1);
  });

  it('should have a close link', function() {
    this.client.show();
    assert.equal(this.modalParent.querySelectorAll(
                 'a').length, 1);
  });

  it('should close when close() is called', function(done) {
    this.client.show();
    assert.equal(this.getAllByPrefixedClass('modal').length, 1);
    this.client.close();
    var that = this;
    // Hack to ensure close has had time to clean-up.
    window.setTimeout(function() {
      assert.equal(that.getAllByPrefixedClass('modal').length, 0);
      done();
    }, 50);
  });

  it('should close when told to by postMessage', function() {
    this.client.show();
    assert.equal(this.getAllByPrefixedClass('modal').length, 1);
    this.client.receiveMessage({origin: 'http://pay.dev:8000', data: 'close'});
    assert.equal(this.client.close.callCount, 1);
  });

  it('should not close due to postMessage from bad origin', function() {
    this.client.show();
    assert.equal(this.getAllByPrefixedClass('modal').length, 1);
    this.client.receiveMessage({origin: 'http://whatever', data: 'close'});
    assert.equal(this.client.close.callCount, 0);
  });

  it('should close when close link is clicked', function() {
    this.client.show();
    assert.equal(this.getAllByPrefixedClass('modal').length, 1);
    helpers.simulateClick(this.modalParent.querySelector('a'));
    assert.equal(this.client.close.callCount, 1);
  });

  it('should close when clicked outside the modal', function() {
    this.client.show();
    assert.equal(this.getAllByPrefixedClass('modal').length, 1);
    helpers.simulateClick(this.getByPrefixedClass('container'));
    assert.equal(this.client.close.callCount, 1);
  });

  it('should not close when the modal itself is clicked', function() {
    this.client.show();
    assert.equal(this.getAllByPrefixedClass('modal').length, 1);
    helpers.simulateClick(this.getByPrefixedClass('modal'));
    assert.equal(this.client.close.callCount, 0);
  });

  it('iframeSrc should be have product and accessToken', function() {
    this.client.show();
    var iframeNode = this.modalParent.querySelector('iframe');
    assert.notEqual(iframeNode, null);
    assert.include(iframeNode.src, 'http://pay.dev:8000/?');
    assert.include(iframeNode.src, 'product=something-awesome');
    assert.include(iframeNode.src, 'access_token=blah-blah-access-token-blah');
  });

});
