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
  }
};
