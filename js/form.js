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

  var inputWrap = document.querySelector('.upload-filter-controls');
  var uploadFilterNone = inputWrap.querySelector('#upload-filter-none');
  var uploadFilterChrome = inputWrap.querySelector('#upload-filter-chrome');
  var uploadFilterSepia = inputWrap.querySelector('#upload-filter-sepia');
  var uploadFilterMarvin = inputWrap.querySelector('#upload-filter-marvin');
  var uploadFilterPhobos = inputWrap.querySelector('#upload-filter-phobos');
  var uploadFilterHeat = inputWrap.querySelector('#upload-filter-heat');

  var filterList = [
    'filter-chrome',
    'filter-sepia',
    'filter-marvin',
    'filter-phobos',
    'filter-heat'
  ];

  var filterImagePreview = document.querySelector('.filter-image-preview');

  function clearClassList() {
    filterList.forEach(function classNameRemove(item) {
      filterImagePreview.classList.remove(item);
    });
  }

  uploadFilterNone.addEventListener('change', function filterNone() {
    clearClassList();
  });

  uploadFilterChrome.addEventListener('change', function filterChrome() {
    clearClassList();
    filterImagePreview.classList.add('filter-chrome');
  });

  uploadFilterSepia.addEventListener('change', function filterSepia() {
    clearClassList();
    filterImagePreview.classList.add('filter-sepia');
  });

  uploadFilterMarvin.addEventListener('change', function filterMarvin() {
    clearClassList();
    filterImagePreview.classList.add('filter-marvin');
  });

  uploadFilterPhobos.addEventListener('change', function filterPhobos() {
    clearClassList();
    filterImagePreview.classList.add('filter-phobos');
  });

  uploadFilterHeat.addEventListener('change', function filterHeat() {
    clearClassList();
    filterImagePreview.classList.add('filter-heat');
  });

  var resizeControlWrap = document.querySelector('.upload-resize-controls');
  var uploadResizeControlsButtonInc = resizeControlWrap.querySelector('.upload-resize-controls-button-inc');
  var uploadResizeControlsButtonDec = resizeControlWrap.querySelector('.upload-resize-controls-button-dec');
  var uploadResizeControlsValue = resizeControlWrap.querySelector('.upload-resize-controls-value');

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
