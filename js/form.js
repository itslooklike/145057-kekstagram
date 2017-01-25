'use strict';

window.onload = function () {
  var uploadOverlay = document.querySelector('.upload-overlay');
  var uploadSelectImage = document.querySelector('#upload-select-image');

  uploadOverlay.classList.add('invisible');
  uploadSelectImage.classList.remove('invisible');

  var uploadFile = document.querySelector('#upload-file');

  uploadFile.addEventListener('change', function showUploadOverlay() {
    uploadOverlay.classList.remove('invisible');
    uploadSelectImage.classList.add('invisible');
  });

  var uploadFormCancel = document.querySelector('.upload-form-cancel');

  uploadFormCancel.addEventListener('click', function showUploadSelectImage() {
    uploadOverlay.classList.add('invisible');
    uploadSelectImage.classList.remove('invisible');
  });

  var filterImagePreview = document.querySelector('.filter-image-preview');
  var uploadFilterChrome = document.querySelector('#upload-filter-chrome');
  var uploadFilterSepia = document.querySelector('#upload-filter-sepia');
  var uploadFilterMarvin = document.querySelector('#upload-filter-marvin');
  var uploadFilterPhobos = document.querySelector('#upload-filter-phobos');
  var uploadFilterHeat = document.querySelector('#upload-filter-heat');

  uploadFilterChrome.addEventListener('change', function filterChrome() {
    // console.log(uploadFilterChrome.checked);
    if (uploadFilterChrome.checked) {
      filterImagePreview.classList.add('filter-chrome');
    } else {
      filterImagePreview.classList.remove('filter-chrome');
    }
  });

  uploadFilterSepia.addEventListener('change', function filterSepia() {
    filterImagePreview.classList.add('filter-sepia');
  });

  uploadFilterMarvin.addEventListener('change', function filterMarvin() {
    filterImagePreview.classList.add('filter-marvin');
  });

  uploadFilterPhobos.addEventListener('change', function filterPhobos() {
    filterImagePreview.classList.add('filter-phobos');
  });

  uploadFilterHeat.addEventListener('change', function filterHeat() {
    filterImagePreview.classList.add('filter-heat');
  });

  var uploadResizeControlsButtonInc = document.querySelector('.upload-resize-controls-button-inc');
  var uploadResizeControlsButtonDec = document.querySelector('.upload-resize-controls-button-dec');
  var uploadResizeControlsValue = document.querySelector('.upload-resize-controls-value');

  var currentZoom = 100;
  var maxZoom = 100;
  var step = 25;

  function setScale(value) {
    filterImagePreview.style.transform = 'scale(' + parseInt(value, 10) / 100 + ')';
  }

  uploadResizeControlsValue.value = currentZoom + '%';

  uploadResizeControlsButtonInc.addEventListener('click', function increaseZoom() {
    var currentValue = parseInt(uploadResizeControlsValue.value, 10);

    uploadResizeControlsValue.value = (currentValue + step > maxZoom ? maxZoom : currentValue + step) + '%';
    setScale(uploadResizeControlsValue.value);
  });

  uploadResizeControlsButtonDec.addEventListener('click', function decreaseZoom() {
    var currentValue = parseInt(uploadResizeControlsValue.value, 10);

    uploadResizeControlsValue.value = (currentValue - step < step ? step : currentValue - step) + '%';
    setScale(uploadResizeControlsValue.value);
  });
};
