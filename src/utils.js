'use strict';

module.exports = {
  getProtocol: function(url) {
    var link = document.createElement('a');
    link.href = url;
    return link.protocol;
  },

  /**
  * Take an object of key value pairs and serialize it into a url-encoded
  * query string.
  * @example
  * // returns foo=bar&baz=zup
  * utils.serialize({'foo': 'bar', 'baz': 'zup'});
  * @param {object} obj - object to serialize
  * @returns {string}
  */
  serialize: function serialize(obj) {
    var str = [];
    for (var p in obj){
      if (obj.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
      }
    }
    return str.join('&');
  },

  buildIframeSrc: function buildIframeSrc(host, params) {
    host = !/\/$/.test(host) ? host + '/' : host;
    return host + '#/?' + this.serialize(params);
  },
};
