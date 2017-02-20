'use strict';

window.initializeFilters = (function () {
  function removeListeners(elem, listener) {
    elem.removeEventListener('click', listener);
    elem.removeEventListener('keydown', listener);
  }

  function addListeners(elem, listener) {
    elem.addEventListener('click', listener);
    elem.addEventListener('keydown', listener);
  }

  return function (elem, callback) {
    var currentFilter = null;

    function filterChanger(evt) {
      var newFilter = null;

      if (evt.target.name === 'upload-filter') {
        newFilter = 'filter-' + evt.target.value;
        editorFilterChanger(newFilter);
      } else if (evt.keyCode === window.utils.KEY_CODES.enter) {
        newFilter = 'filter-' + evt.target.control.value;
        evt.target.control.checked = true;
        editorFilterChanger(newFilter);
      }
    }

    function editorFilterChanger(newFilter) {
      if (typeof callback === 'function') {
        callback(currentFilter, currentFilter = newFilter);
      }
    }

    return {
      unsubscribe: removeListeners.bind(removeListeners, elem, filterChanger),
      subscribe: addListeners.bind(addListeners, elem, filterChanger)
    };
  };
})();
