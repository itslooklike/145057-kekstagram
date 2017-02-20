'use strict';

window.createScale = function () {
  var maxZoom = 100;
  var step = 25;
  var currentZoomValue = null;
  var callback = null;

  function pictureScaleSet(elem) {
    currentZoomValue = currentZoomValue ? currentZoomValue : maxZoom;

    if (callback) {
      callback(currentZoomValue);
    }

    elem.querySelector('input').value = currentZoomValue + '%';
  }

  function changeZoom(elem, evt) {
    if (window.utils.isActivationEvent(evt)) {
      var decBtn = 'upload-resize-controls-button-dec';
      var incBtn = 'upload-resize-controls-button-inc';

      if (evt.target.classList.contains(incBtn)) {
        currentZoomValue = currentZoomValue + step > maxZoom ? maxZoom : currentZoomValue + step;
      } else if (evt.target.classList.contains(decBtn)) {
        currentZoomValue = currentZoomValue - step < step ? step : currentZoomValue - step;
      }

      pictureScaleSet(elem);
    }
  }

  var changeZoomHandler = null;

  return {
    initializeScale: function (elem, cb) {
      if (typeof cb === 'function') {
        callback = cb;
      }
      pictureScaleSet(elem);
      changeZoomHandler = changeZoom.bind(changeZoom, elem);
      elem.addEventListener('click', changeZoomHandler);
    },

    removeScaleListeners: function (elem) {
      elem.removeEventListener('click', changeZoomHandler);
    }
  };
};
