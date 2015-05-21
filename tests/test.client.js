'use strict';

var PaymentsClient = require('payments-client');
var helpers = require('helpers');

describe('Test client', function() {

  beforeEach(function() {
    this.button = document.createElement('button');
    this.modalParent = document.createElement('div');
    this.client = new PaymentsClient(this.button, this.modalParent, {
      closeDelayMs: 0,
    });
  });

  afterEach(function() {
    this.modalParent.innerHTML = '';
  });

  it('should be available via require', function() {
    assert.ok(PaymentsClient);
  });

  it('should have a container', function() {
    helpers.simulateClick(this.button);
    assert.equal(this.modalParent.querySelectorAll(
                 '.' + this.client.prefix('container')).length, 1);
  });

  it('should have a modal', function() {
    helpers.simulateClick(this.button);
    assert.equal(this.modalParent.querySelectorAll(
                 '.' + this.client.prefix('modal')).length, 1);
  });

  it('should have a close link', function() {
    helpers.simulateClick(this.button);
    assert.equal(this.modalParent.querySelectorAll(
                 'a').length, 1);
  });

  it('should close when close link is clicked', function(done) {
    helpers.simulateClick(this.button);
    assert.equal(this.modalParent.querySelectorAll(
                 '.' + this.client.prefix('modal')).length, 1);
    helpers.simulateClick(this.modalParent.querySelector('a'));
    var modalContainer = '.' + this.client.prefix('container');
    var that = this;
    window.setTimeout(function() {
      assert.equal(that.modalParent.querySelector(modalContainer), null);
      done();
    }, 0);
  });

  it('should close when clicked outside the modal', function(done) {
    helpers.simulateClick(this.button);
    assert.equal(this.modalParent.querySelectorAll(
                 '.' + this.client.prefix('modal')).length, 1);
    var modalContainer = '.' + this.client.prefix('container');
    helpers.simulateClick(this.modalParent.querySelector(modalContainer));
    var that = this;
    window.setTimeout(function() {
      assert.equal(that.modalParent.querySelector(modalContainer), null);
      done();
    }, 0);
  });

});
