'use strict';

window.initializeFilters = function (element) {
  var utils = window.utils();

  function filterChanger(evt) {
    var filterName = null;

    if (evt.target.name === 'upload-filter') {
      filterName = 'filter-' + evt.target.value;
      utils.editorFilterChanger(filterName);
    } else if (evt.keyCode === utils.KEY_CODE.enter) {
      filterName = 'filter-' + evt.target.control.value;
      evt.target.control.checked = true;
      utils.editorFilterChanger(filterName);
    }
  }

  element.addEventListener('click', filterChanger);
  element.addEventListener('keydown', filterChanger);
};
