'use strict';

window.utils = {
  KEY_CODES: {
    escape: 27,
    enter: 13
  },

  isDeactivationEvent: function (evt) {
    return evt.keyCode === this.KEY_CODES.escape;
  },

  isActivationEvent: function (evt) {
    return evt.keyCode === this.KEY_CODES.enter || evt.type === 'click';
  },

  runIfCallback: function (cb) {
    if (typeof cb === 'function') {
      cb();
    }
  },

  globalCloser: function (cb, evt) {
    if (window.utils.isDeactivationEvent(evt)) {
      window.utils.runIfCallback(cb);
    }
  },

  globalActivation: function (cb, evt) {
    if (window.utils.isActivationEvent(evt)) {
      window.utils.runIfCallback(cb);
    }
  }
};
