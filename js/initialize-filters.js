'use strict';

window.initializeFilters = (function () {
  var FILTER_BTN = 'upload-filter';
  var FILTER_PREFIX = 'filter-';

  function removeListeners(elem, listener) {
    elem.removeEventListener('click', listener);
    elem.removeEventListener('keydown', listener);
  }

  function addListeners(elem, callback, listener) {
    callback();
    elem.addEventListener('click', listener);
    elem.addEventListener('keydown', listener);
  }

  return function (elem, callback) {
    var currentFilter = null;

    function changeFilterHandler(evt) {
      var newFilter = null;

      if (evt.target.name === FILTER_BTN) {
        newFilter = evt.target.value;
        applyNewFilter(newFilter);
      } else if (evt.keyCode === window.utils.keyCodes.ENTER) {
        newFilter = evt.target.control.value;
        evt.target.control.checked = true;
        applyNewFilter(newFilter);
      }
    }

    function applyNewFilter(newFilter) {
      if (typeof callback === 'function') {
        callback(FILTER_PREFIX + currentFilter, FILTER_PREFIX + (currentFilter = newFilter));
      }
    }

    function checkCurrentFilter() {
      if (currentFilter) {
        elem.querySelector('input[value=' + currentFilter + ']').checked = true;
      }
    }

    return {
      unsubscribe: removeListeners.bind(removeListeners, elem, changeFilterHandler),
      subscribe: addListeners.bind(addListeners, elem, checkCurrentFilter, changeFilterHandler)
    };
  };
})();
