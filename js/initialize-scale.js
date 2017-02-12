'use strict';

window.createScale = (function () {
  var zoomValue = document.querySelector('.upload-resize-controls-value');
  var picture = document.querySelector('.filter-image-preview');
  var defaultZoom = 100;
  var currentValue = null;

  function pictureScaleSet(scale) {
    picture.style.transform = 'scale(' + parseInt(scale, 10) / 100 + ')';
  }

  function pictureZoomValueSet(zoom) {
    zoomValue.value = zoom + '%';
    pictureScaleSet(zoom);
  }

  function pictureScaleReset() {
    pictureZoomValueSet(defaultZoom);
  }

  function pictureZoomValueGet() {
    return parseInt(zoomValue.value, 10);
  }

  function changeZoom(step, maxZoom, evt) {
    if (window.utils.isActivationEvent(evt)) {
      currentValue = pictureZoomValueGet();

      var decBtn = 'upload-resize-controls-button-dec';
      var incBtn = 'upload-resize-controls-button-inc';

      if (evt.target.classList.contains(incBtn)) {
        pictureZoomValueSet(currentValue + step > maxZoom ? maxZoom : currentValue + step);
      } else if (evt.target.classList.contains(decBtn)) {
        pictureZoomValueSet(currentValue - step < step ? step : currentValue - step);
      }
    }
  }

  var changeZoomHandler = null;

  return {
    pictureScaleReset: pictureScaleReset,

    initScaleListeners: function (elem, step, maxZoom) {
      changeZoomHandler = changeZoom.bind(changeZoom, step, maxZoom);
      elem.addEventListener('click', changeZoomHandler);
    },

    removeScaleListeners: function (elem) {
      elem.removeEventListener('click', changeZoomHandler);
    }
  };
})();
