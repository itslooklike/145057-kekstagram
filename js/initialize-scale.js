'use strict';

window.createScale = function (inc, dec, zoomValue, step, maxZoom, picture) {
  zoomValue.value = maxZoom + '%';

  function setPictureScale(value) {
    picture.style.transform = 'scale(' + parseInt(value, 10) / 100 + ')';
  }

  function changeZoom(increase) {
    var currentValue = parseInt(zoomValue.value, 10);

    if (increase) {
      zoomValue.value = (currentValue + step > maxZoom ? maxZoom : currentValue + step) + '%';
    } else {
      zoomValue.value = (currentValue - step < step ? step : currentValue - step) + '%';
    }

    setPictureScale(zoomValue.value);
  }

  var increaseZoom = changeZoom.bind(changeZoom, true);
  var decreaseZoom = changeZoom.bind(changeZoom, false);

  inc.addEventListener('click', increaseZoom);
  dec.addEventListener('click', decreaseZoom);
};
