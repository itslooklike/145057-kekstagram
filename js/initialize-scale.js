'use strict';

window.initializeScale = (function () {
  var ZOOM_DECREMENT_BTN = 'upload-resize-controls-button-dec';
  var ZOOM_INCREMENT_BTN = 'upload-resize-controls-button-inc';

  function removeListeners(elem, listener) {
    elem.removeEventListener('click', listener);
  }

  function addListeners(elem, callback, listener) {
    callback();
    elem.addEventListener('click', listener);
  }

  return function (elem, scaleStep, scaleMax, callback) {
    var currentZoomValue = null;
    var zoomInput = elem.querySelector('input');

    function zoomChangeHandler(evt) {
      if (window.utils.isActivationEvent(evt)) {
        if (evt.target.classList.contains(ZOOM_INCREMENT_BTN)) {
          currentZoomValue = currentZoomValue + scaleStep > scaleMax ? scaleMax : currentZoomValue + scaleStep;
        } else if (evt.target.classList.contains(ZOOM_DECREMENT_BTN)) {
          currentZoomValue = currentZoomValue - scaleStep < scaleStep ? scaleStep : currentZoomValue - scaleStep;
        }

        setPictureScaleValueHandler();
      }
    }

    function setPictureScaleValueHandler() {
      currentZoomValue = currentZoomValue ? currentZoomValue : scaleMax;
      zoomInput.value = currentZoomValue + '%';
      callback(currentZoomValue);
    }

    return {
      unsubscribe: removeListeners.bind(removeListeners, elem, zoomChangeHandler),
      subscribe: addListeners.bind(addListeners, elem, setPictureScaleValueHandler, zoomChangeHandler)
    };
  };
})();
