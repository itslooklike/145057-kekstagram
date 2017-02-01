'use strict';

window.onload = function () {
  function initPhotoEditor() {

    var KEY_CODE = {
      'enter': 13,
      'escape': 27
    };

    var FILTER_LIST = [
      'filter-none',
      'filter-chrome',
      'filter-sepia',
      'filter-marvin',
      'filter-phobos',
      'filter-heat'
    ];

    var EDITOR_DEFAULT_ZOOM = 100;

    var picture = document.querySelector('.filter-image-preview');

    function setPictureScale(value) {
      picture.style.transform = 'scale(' + parseInt(value, 10) / 100 + ')';
    }

    function clearPictureFilters() {
      FILTER_LIST.forEach(function (item) {
        picture.classList.remove(item);
      });
    }

    function filterChanger(evt) {
      if (evt.target.name === 'upload-filter') {
        clearPictureFilters();
        picture.classList.add('filter-' + evt.target.value);
      } else if (evt.keyCode && evt.keyCode === KEY_CODE.enter) {
        clearPictureFilters();
        evt.target.control.checked = true;
        picture.classList.add('filter-' + evt.target.control.value);
      }
    }

    var zoomValue = document.querySelector('.upload-resize-controls-value');

    function editorZoomReset() {
      zoomValue.value = EDITOR_DEFAULT_ZOOM + '%';
      setPictureScale(EDITOR_DEFAULT_ZOOM);
    }

    var editorWindow = document.querySelector('.upload-overlay');
    var uploadImageForm = document.querySelector('#upload-select-image');

    function toggleUploadForm() {
      editorWindow.classList.toggle('invisible');
      uploadImageForm.classList.toggle('invisible');
      editorZoomReset();
    }

    var filtersWrap = document.querySelector('.upload-filter-controls');

    function closePhtotoEditor(evt) {
      if (evt.keyCode && evt.keyCode === KEY_CODE.escape || evt.type === 'click') {
        uploadImageForm.reset();
        clearPictureFilters();
        toggleUploadForm();
        filtersWrap.removeEventListener('click', filterChanger);
      }
    }

    function filtersHandlersOn() {
      filtersWrap.addEventListener('click', filterChanger);
      filtersWrap.addEventListener('keydown', filterChanger);
    }

    function openPhotoEditor() {
      toggleUploadForm();
      filtersHandlersOn();
    }

    function zoomer() {
      var maxZoom = 100;
      var step = 25;

      var controlWrap = document.querySelector('.upload-resize-controls');
      var inc = controlWrap.querySelector('.upload-resize-controls-button-inc');
      var dec = controlWrap.querySelector('.upload-resize-controls-button-dec');

      function changeZoom(increase) {
        return function () {
          var currentValue = parseInt(zoomValue.value, 10);

          if (increase) {
            zoomValue.value = (currentValue + step > maxZoom ? maxZoom : currentValue + step) + '%';
          } else {
            zoomValue.value = (currentValue - step < step ? step : currentValue - step) + '%';
          }

          setPictureScale(zoomValue.value);
        };
      }

      var increaseZoom = changeZoom(true);
      var decreaseZoom = changeZoom(false);

      inc.addEventListener('click', increaseZoom);
      dec.addEventListener('click', decreaseZoom);
    }

    var closePhotoEditorBtn = document.querySelector('.upload-form-cancel');

    closePhotoEditorBtn.addEventListener('click', closePhtotoEditor);
    closePhotoEditorBtn.addEventListener('keydown', closePhtotoEditor);

    var uploadFile = document.querySelector('#upload-file');

    uploadFile.addEventListener('change', openPhotoEditor);
    toggleUploadForm();
    zoomer();
  }

  initPhotoEditor();
};
