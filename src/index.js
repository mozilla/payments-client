'use strict';

var utils = require('utils');

function PaymentsClient(config) {
  config = config || {};
  config.product = config.product || {};

  this.modalParent = config.modalParent || document.body;
  // Create a unique instance id.
  this.id = '_' + Math.random().toString(36).substr(2, 9);
  this.modalWidth = config.modalWidth || 318;
  this.modalHeight = config.modalHeight || 468;
  this.closeDelayMs = typeof config.closeDelayMs === 'number' ?
                        config.closeDelayMs : 300;
  this.accessToken = config.accessToken;
  this.paymentHost = config.paymentHost || 'http://pay.dev:8000/';
  this.httpsOnly =
    typeof config.httpsOnly === 'undefined' ? true : config.httpsOnly;

  var paymentHostProtocol = utils.getProtocol(this.paymentHost);
  var win = config._window || window;

  if (this.httpsOnly === true && win.location.protocol !== 'https:') {
    throw new Error('Host site should run under SSL');
  }

  if (this.httpsOnly === true && paymentHostProtocol !== 'https:') {
    throw new Error('paymentHost is not https');
  }

  if (paymentHostProtocol !== 'http:' && paymentHostProtocol !== 'https:') {
    throw new Error('paymentHost must be http or https');
  }

  if (typeof config.product !== 'object' || !config.product.id) {
    throw new Error('A product id must be provided in a product object');
  }

  var productImageUrl = config.product.image;
  if (!productImageUrl) {
    console.warn(
      'A product image URL was not supplied as a property of config.product.');
  } else {
    var imageProtocol = utils.getProtocol(productImageUrl);
    if (this.httpsOnly && imageProtocol !== 'https:') {
      throw new Error('product.image must be served over https');
    } else if (imageProtocol !== 'http:' && imageProtocol !== 'https:') {
      throw new Error('product.image is served over an invalid protocol');
    }
  }

  if (typeof this.accessToken !== 'string') {
    throw new Error('An \'accessToken\' string must be provided');
  }

  if (this.httpsOnly === false) {
    console.warn('httpsOnly is set to false. Only use for dev');
  }

  var that = this;
  window.addEventListener('message', function(e) {
    that.receiveMessage.call(that, e);
  }, false);

  this.product = config.product;

  return this;
}

PaymentsClient.prototype = {

  validIframeOrigins: [
    'http://pay.dev:8000',
    'http://pay.dev.mozaws.net:8000',
  ],

  classPrefix: 'fxa-pay',

  prefix: function(str) {
    return this.classPrefix + '-' + str;
  },

  receiveMessage: function(e) {
    if (this.validIframeOrigins.indexOf(e.origin) === -1) {
      console.warn('Ignored message from invalid origin', e.origin);
      return;
    }
    try {
      var data = JSON.parse(e.data) || {};
      if (data.event === 'purchase-completed') {
        this.close();
      } else {
        console.warn('Unhandled postMessage data received');
      }
    } catch(err) {
      console.error('postMessage data should be stringified JSON', e.data);
      throw err;
    }
  },

  getStyle: function (elm, prop) {
    if (typeof getComputedStyle !== 'undefined') {
      return getComputedStyle(elm, null).getPropertyValue(prop);
    } else {
      return elm.currentStyle[prop];
    }
  },

  iframeStyle: {
    border: 'none',
    height: '100%',
    width: '100%',
  },

  closeButtonStyle: {
    color: '#666',
    fontSize: '20px',
    padding: '10px',
    position: 'absolute',
    right: '5px',
    textDecoration: 'none',
    zIndex: 2020,
  },

  outerStyle: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    bottom: 0,
    left: 0,
    opacity: 0,
    position: 'fixed',
    right: 0,
    top: 0,
    transition: 'opacity 0.3s',
    zIndex: 2000,
  },

  getProductImageStyle: function() {
    var that = this;
    return {
      left: 0,
      background: 'url(' + that.product.image + ') no-repeat 50% 0',
      backgroundSize: '55px',
      position: 'absolute',
      right: 0,
      top: '-27.5px',
      zIndex: 2015,
      height: '55px',
    };
  },

  getInnerStyle: function() {
    var that = this;
    return {
      backgroundColor: '#fff',
      border: '1px solid #C3CFD8',
      borderRadius: '3px',
      boxShadow: '0 3px 7px rgba(0, 0, 0, 0.5)',
      height: that.modalHeight + 'px',
      left: '50%',
      marginLeft: '-' + that.modalWidth / 2 + 'px',
      marginTop: '-' + that.modalHeight / 2 + 'px',
      opacity: 0,
      padding: '0',
      position: 'absolute',
      top: '50%',
      transition: 'opacity 0.3s',
      width: that.modalWidth + 'px',
      zIndex: 2010,
    };
  },

  applyStyles: function(elm, styleObj) {
    Object.keys(styleObj).forEach(function(key) {
      elm.style[key] = styleObj[key];
    });
  },

  buildModal: function() {
    var that = this;
    var doc = document;
    var outer = doc.createElement('div');
    outer.setAttribute('id', this.id);
    outer.className = this.prefix('container');
    outer.addEventListener('click', function(e) {
      e.preventDefault();
      that.close();
    }, false);

    var inner = doc.createElement('div');
    inner.className = this.prefix('modal');
    inner.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
    }, false);

    outer.appendChild(inner);
    this.applyStyles(outer, this.outerStyle);

    if (this.product.image) {
      var productImage = doc.createElement('div');
      this.applyStyles(productImage, this.getProductImageStyle());
      inner.appendChild(productImage);
    }

    var closeButton = doc.createElement('a');
    closeButton.href = '#';
    var buttonText = doc.createTextNode('×');
    closeButton.appendChild(buttonText);

    this.applyStyles(closeButton, this.closeButtonStyle);

    closeButton.addEventListener('click', function(e) {
      e.preventDefault();
      that.close();
    }, false);

    inner.appendChild(closeButton);

    var iframe_ = doc.createElement('iframe');
    var iframeSrc = utils.buildIframeSrc(this.paymentHost, {
      access_token: this.accessToken,
      product: this.product.id,
    });
    iframe_.setAttribute('src', iframeSrc);
    inner.appendChild(iframe_);

    this.applyStyles(iframe_, this.iframeStyle);
    this.applyStyles(inner, this.getInnerStyle());

    outer._inner = inner;

    return outer;
  },

  show: function() {
    this.modal = this.buildModal();
    // Turn off scroll for document.
    this.parentOverflow = this.getStyle(this.modalParent, 'overflowY');
    this.modalParent.style.overflowY = 'hidden';
    this.modalParent.appendChild(this.modal);
    this.modal.style.opacity = 1;
    this.modal._inner.style.opacity = 1;
  },

  close: function() {
    // Restore scroll
    this.modalParent.style.overflow = this.parentOverflow;
    this.modal.style.opacity = 0;
    this.modal._inner.style.opacity = 0;
    var that = this;
    window.setTimeout(function(){
      that.modalParent.removeChild(that.modal);
    }, this.closeDelayMs);
  },
};

module.exports = PaymentsClient;
