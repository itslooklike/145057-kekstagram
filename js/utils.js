'use strict';

window.utils = (function () {
  var KEY_CODES = {
    escape: 27,
    enter: 13
  };

  var isKeyboardEvent = function (evt) {
    return typeof evt.keyCode !== 'undefined';
  };

  return {
    KEY_CODES: KEY_CODES,

    isDeactivationEvent: function (evt) {
      return isKeyboardEvent(evt) && evt.keyCode === KEY_CODES.escape;
    },

    isActivationEvent: function (evt) {
      return isKeyboardEvent(evt) && evt.keyCode === KEY_CODES.enter || evt.type === 'click';
    },
  };
})();
