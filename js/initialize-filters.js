'use strict';

window.initializeFilters = (function () {
  var currentFilter = null;

  function editorFilterChanger(cb, newFilter) {
    if (typeof cb === 'function') {
      cb(currentFilter, currentFilter = newFilter);
    }
  }

  function filterChanger(cb, evt) {
    var newFilter = null;

    if (evt.target.name === 'upload-filter') {
      newFilter = 'filter-' + evt.target.value;
      editorFilterChanger(cb, newFilter);
    } else if (evt.keyCode === window.utils.KEY_CODES.enter) {
      newFilter = 'filter-' + evt.target.control.value;
      evt.target.control.checked = true;
      editorFilterChanger(cb, newFilter);
    }
  }

  var filterChangerHandler = null;

  return {
    initializeFilters: function (wrap, cb) {
      editorFilterChanger(cb);
      filterChangerHandler = filterChanger.bind(filterChanger, cb);
      wrap.addEventListener('click', filterChangerHandler);
      wrap.addEventListener('keydown', filterChangerHandler);
    },

    removeFiltersListeners: function (wrap) {
      wrap.removeEventListener('click', filterChangerHandler);
      wrap.removeEventListener('keydown', filterChangerHandler);
    }
  };
})();
