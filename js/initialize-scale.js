'use strict';

window.createScale = function (elem, step, maxZoom) {
  var picture = document.querySelector('.filter-image-preview'); // дубль в initializeFilters
  var zoomValue = document.querySelector('.upload-resize-controls-value');
  zoomValue.value = maxZoom + '%';

  function setPictureScale(value) {
    picture.style.transform = 'scale(' + parseInt(value, 10) / 100 + ')';
  }

  function changeZoom() {
    var currentValue = parseInt(zoomValue.value, 10);

    if (step > 0) {
      zoomValue.value = (currentValue + step > maxZoom ? maxZoom : currentValue + step) + '%';
    } else {
      zoomValue.value = (currentValue + step < Math.abs(step) ? Math.abs(step) : currentValue + step) + '%';
    }

    setPictureScale(zoomValue.value);
  }

  elem.addEventListener('click', changeZoom);
};
