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

  function changeZoomHandler(step, maxZoom) {
    currentValue = pictureZoomValueGet();

    if (step > 0) {
      pictureZoomValueSet(currentValue + step > maxZoom ? maxZoom : currentValue + step);
    } else {
      pictureZoomValueSet(currentValue + step < Math.abs(step) ? Math.abs(step) : currentValue + step);
    }
  }

  return {
    pictureScaleReset: pictureScaleReset,

    initScaleListeners: function (elem, step, maxZoom) {
      elem.addEventListener('click', changeZoomHandler.bind(changeZoomHandler, step, maxZoom)); // при bind как-то можно evt передать?
      // elem.addEventListener('keydown', changeZoomHandler.bind(changeZoomHandler, step, maxZoom));
    },

    removeScaleListeners: function (elem) {
      elem.removeEventListener('click', changeZoomHandler); // не удаляются листнеры
      // elem.removeEventListener('keydown', changeZoomHandler);
    }
  };
})();
