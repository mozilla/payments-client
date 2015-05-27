'use strict';

var utils = require('utils');


describe('utils.getProtocol()', function() {

  it('can parse javascript psuedo protocols', function() {
    /*eslint-disable no-script-url */
    assert.equal(
      utils.getProtocol('javascript:alert("whatever")'), 'javascript:');
  });

  it('can parse http', function() {
    assert.equal(utils.getProtocol('http://foo.com'), 'http:');
  });

  it('can parse https', function() {
    assert.equal(utils.getProtocol('https://foo.com'), 'https:');
  });

});


describe('utils.serialize()', function() {

  it('should serialize object', function() {
    assert.equal(utils.serialize({foo: 'bar', baz: 'zup'}),
                 'foo=bar&baz=zup');
  });

  it('should urlencode keys + values', function() {
    assert.equal(
      utils.serialize({'album name': 'Back in Black', 'artist': 'AC/DC'}),
      'album%20name=Back%20in%20Black&artist=AC%2FDC');
  });

});


describe('utils.buildIframeSrc()', function() {

  it('should build iframe url from host + params', function() {
    assert.equal(
      utils.buildIframeSrc('https://bar.com/', {foo: 'bar', baz: 'zup'}),
      'https://bar.com/?foo=bar&baz=zup');
  });

  it('should add a missing trailing /', function() {
    assert.equal(
      utils.buildIframeSrc('https://bar.com', {foo: 'bar', baz: 'zup'}),
      'https://bar.com/?foo=bar&baz=zup');
  });

});
