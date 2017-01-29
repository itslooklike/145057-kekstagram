'use strict';

window.onload = function () {

  // Overlay toggle
  var uploadOverlay = document.querySelector('.upload-overlay');
  var uploadSelectImage = document.querySelector('#upload-select-image');

  function toggleUploadForm(isOpening) {
    if (isOpening) {
      uploadOverlay.classList.remove('invisible');
      uploadSelectImage.classList.add('invisible');
    } else {
      uploadOverlay.classList.add('invisible');
      uploadSelectImage.classList.remove('invisible');
    }
  }

  var uploadFile = document.querySelector('#upload-file');
  uploadFile.addEventListener('change', function showUploadOverlay() {
    toggleUploadForm(true);
  });

  var uploadFormCancel = document.querySelector('.upload-form-cancel');
  uploadFormCancel.addEventListener('click', function showUploadSelectImage() {
    uploadSelectImage.reset();
    toggleUploadForm();
  });

  toggleUploadForm();

  // Filters
  var inputWrap = document.querySelector('.upload-filter-controls');
  var filterImagePreview = document.querySelector('.filter-image-preview');

  var filterList = [
    'filter-none',
    'filter-chrome',
    'filter-sepia',
    'filter-marvin',
    'filter-phobos',
    'filter-heat'
  ];

  function clearClassList() {
    filterList.forEach(function (item) {
      filterImagePreview.classList.remove(item);
    });
  }

  filterList.forEach(function (item) {
    var filterBtn = inputWrap.querySelector('#upload-' + item);

    filterBtn.addEventListener('change', function filter() {
      clearClassList();
      filterImagePreview.classList.add(item);
    });
  });

  // Zoom
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
