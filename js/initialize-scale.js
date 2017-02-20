'use strict';

window.initializeScale = (function () {
  var maxZoom = 100;
  var step = 25;

  function removeListeners(elem, listener) {
    elem.removeEventListener('click', listener);
  }

  function addListeners(elem, pictureScaleSet, listener) {
    pictureScaleSet();
    elem.addEventListener('click', listener);
  }

  return function (elem, callback) {
    var currentZoomValue = null;

    function pictureScaleSet() {
      currentZoomValue = currentZoomValue ? currentZoomValue : maxZoom;

      if (typeof callback === 'function') {
        callback(currentZoomValue);
      }

      elem.querySelector('input').value = currentZoomValue + '%';
    }

    function changeZoom(evt) {
      if (window.utils.isActivationEvent(evt)) {
        var decBtn = 'upload-resize-controls-button-dec';
        var incBtn = 'upload-resize-controls-button-inc';

        if (evt.target.classList.contains(incBtn)) {
          currentZoomValue = currentZoomValue + step > maxZoom ? maxZoom : currentZoomValue + step;
        } else if (evt.target.classList.contains(decBtn)) {
          currentZoomValue = currentZoomValue - step < step ? step : currentZoomValue - step;
        }

        pictureScaleSet();
      }
    }

    return {
      unsubscribe: removeListeners.bind(removeListeners, elem, changeZoom),
      subscribe: addListeners.bind(addListeners, elem, pictureScaleSet, changeZoom)
    };
  };
})();
