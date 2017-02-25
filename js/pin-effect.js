'use strict';

window.pinEffect = (function () {
  var pin = document.querySelector('.upload-filter-level-pin');
  var pinLine = document.querySelector('.upload-filter-level-line');
  var pinFill = document.querySelector('.upload-filter-level-val');

  var pinSlider = function (pinRowProps, evt) {
    var mousePositionX = evt.x;

    if (mousePositionX > pinRowProps.x && mousePositionX < pinRowProps.x + pinRowProps.width) {
      pin.style.left = pinFill.style.width = mousePositionX - pinRowProps.x + 'px';

      // тут менять стили
    }
  };

  var mouseMoveHandler;

  var removeListeners = function () {
    document.removeEventListener('mousemove', mouseMoveHandler);
    document.removeEventListener('mouseup', removeListeners);
  };

  var mousePositionHandler = function () {
    var pinRow = pinLine.getBoundingClientRect();
    var posit = {
      x: pinRow.left,
      width: pinRow.width
    };

    mouseMoveHandler = pinSlider.bind(null, posit);

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', removeListeners);
  };

  pinLine.addEventListener('mousedown', mousePositionHandler);
})();
