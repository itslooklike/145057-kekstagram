'use strict';

window.utils = {
  KEY_CODES: {
    escape: 27,
    enter: 13
  },

  getRandomElement: function (arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  },

  isDeactivationEvent: function (evt) {
    return evt.keyCode === this.KEY_CODES.escape;
  },

  isActivationEvent: function (evt) {
    return evt.keyCode === this.KEY_CODES.enter || evt.type === 'click';
  },

  runIfCallback: function (callback) {
    if (typeof callback === 'function') {
      callback();
    }
  },

  runCallbackIfDeactivate: function (callback, evt) {
    if (window.utils.isDeactivationEvent(evt)) {
      window.utils.runIfCallback(callback);
    }
  },

  runCallbackIfActivate: function (callback, evt) {
    if (window.utils.isActivationEvent(evt)) {
      window.utils.runIfCallback(callback);
    }
  }
};
