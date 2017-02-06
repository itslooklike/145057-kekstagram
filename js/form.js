'use strict';

window.onload = function () {
  function initPhotoEditor() {
    var editorWindow = document.querySelector('.upload-overlay');
    var uploadImageForm = document.querySelector('#upload-select-image');

    function toggleUploadForm() {
      editorWindow.classList.toggle('invisible');
      uploadImageForm.classList.toggle('invisible');
    }

    function closePhtotoEditor(evt) {
      if (evt.keyCode === window.utils.KEY_CODE.escape || evt.type === 'click') {
        uploadImageForm.reset();
        toggleUploadForm();
      }
    }

    function openPhotoEditor() {
      toggleUploadForm();
    }

    var closePhotoEditorBtn = document.querySelector('.upload-form-cancel');
    closePhotoEditorBtn.addEventListener('click', closePhtotoEditor);
    closePhotoEditorBtn.addEventListener('keydown', closePhtotoEditor);

    var uploadFile = document.querySelector('#upload-file');
    uploadFile.addEventListener('change', openPhotoEditor);
    toggleUploadForm();

    var picture = document.querySelector('.filter-image-preview');
    var maxZoom = 100;
    var step = 25;
    var zoomValue = document.querySelector('.upload-resize-controls-value');
    var inc = document.querySelector('.upload-resize-controls-button-inc');
    var dec = document.querySelector('.upload-resize-controls-button-dec');
    window.createScale(inc, dec, zoomValue, step, maxZoom, picture);

    var FILTER_LIST = [
      'filter-none',
      'filter-chrome',
      'filter-sepia',
      'filter-marvin',
      'filter-phobos',
      'filter-heat'
    ];
    var filtersWrap = document.querySelector('.upload-filter-controls');

    window.initializeFilters(filtersWrap, picture, FILTER_LIST);
  }

  initPhotoEditor();
};
