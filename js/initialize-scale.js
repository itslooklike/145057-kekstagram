'use strict';

window.createScale = function (elem, step, maxZoom) {
  var utils = window.utils();

  function changeZoom() {
    var currentValue = utils.pictureZoomValueGet();

    if (step > 0) {
      utils.pictureZoomValueSet(currentValue + step > maxZoom ? maxZoom : currentValue + step);
    } else {
      utils.pictureZoomValueSet(currentValue + step < Math.abs(step) ? Math.abs(step) : currentValue + step);
    }
  }

  elem.addEventListener('click', changeZoom);
};
