'use strict';

window.utils = {
  'KEY_CODE': {
    'enter': 13,
    'escape': 27
  },
  'classChanger': function (elem, oldClass, newClass) {
    if (oldClass) {
      elem.classList.remove(oldClass);
    }
    elem.classList.add(newClass);
  }
};
