'use strict';

window.initializeFilters = (function () {
  var currentFilter = null;

  var picture = document.querySelector('.filter-image-preview');
  var filtersWrap = document.querySelector('.upload-filter-controls');

  function editorFilterReset() {
    picture.classList.remove(currentFilter);
  }

  function editorFilterChanger(newFilter) {
    editorFilterReset();
    picture.classList.add(currentFilter = newFilter);
  }

  function filterChangerHandler(evt) {
    var filterName = null;

    if (evt.target.name === 'upload-filter') {
      filterName = 'filter-' + evt.target.value;
      editorFilterChanger(filterName);
    } else if (evt.keyCode === window.utils.KEY_CODES.enter) {
      filterName = 'filter-' + evt.target.control.value;
      evt.target.control.checked = true;
      editorFilterChanger(filterName);
    }
  }

  return {
    editorFilterReset: editorFilterReset,

    initFiltersListeners: function () {
      filtersWrap.addEventListener('click', filterChangerHandler);
      filtersWrap.addEventListener('keydown', filterChangerHandler);
    },

    removeFiltersListeners: function () {
      filtersWrap.removeEventListener('click', filterChangerHandler);
      filtersWrap.removeEventListener('keydown', filterChangerHandler);
    }
  };
})();
