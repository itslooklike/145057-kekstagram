'use strict';

window.utils = {
  keyCodes: {
    ESCAPE: 27,
    ENTER: 13
  },

  getRandomElement: function (arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  },

  isDeactivationEvent: function (evt) {
    return evt.keyCode === this.keyCodes.ESCAPE;
  },

  isActivationEvent: function (evt) {
    return evt.keyCode === this.keyCodes.ENTER || evt.type === 'click';
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
