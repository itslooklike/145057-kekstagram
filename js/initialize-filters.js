'use strict';

window.initializeFilters = function (element) {
  var picture = document.querySelector('.filter-image-preview'); // дубль в createScale
  var currentFilter = null;

  function filterChanger(evt) {
    var filterName = null;

    if (evt.target.name === 'upload-filter') {
      filterName = 'filter-' + evt.target.value;
      window.utils.classChanger(picture, currentFilter, currentFilter = filterName);

    } else if (evt.keyCode === window.utils.KEY_CODE.enter) {

      filterName = 'filter-' + evt.target.control.value;
      evt.target.control.checked = true;
      window.utils.classChanger(picture, currentFilter, currentFilter = filterName);
    }
  }

  element.addEventListener('click', filterChanger);
  element.addEventListener('keydown', filterChanger);
};
