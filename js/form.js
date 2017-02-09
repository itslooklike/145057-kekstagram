'use strict';

window.onload = function () {
  var filtersWrap = document.querySelector('.upload-filter-controls');
  window.initializeFilters(filtersWrap);

  var maxZoom = 100;
  var incStep = 25;
  var decStep = -incStep;
  var inc = document.querySelector('.upload-resize-controls-button-inc');
  var dec = document.querySelector('.upload-resize-controls-button-dec');
  window.createScale(inc, incStep, maxZoom);
  window.createScale(dec, decStep, maxZoom);

  var editorWindow = document.querySelector('.upload-overlay');
  var uploadImageForm = document.querySelector('#upload-select-image');
  var utils = window.utils();

  function openEditor() {
    utils.editorFilterReset();
    utils.pictureZoomValueSet(maxZoom);
    editorWindow.classList.remove('invisible');
    uploadImageForm.classList.add('invisible');
  }

  function closeEditor() {
    editorWindow.classList.add('invisible');
    uploadImageForm.classList.remove('invisible');
  }

  function closeEditorByKey(evt) {
    if (evt.keyCode === utils.KEY_CODE.escape || evt.type === 'click') {
      uploadImageForm.reset();
      closeEditor();
    }
  }

  var closePhotoEditorBtn = document.querySelector('.upload-form-cancel');
  closePhotoEditorBtn.addEventListener('click', closeEditorByKey);
  closePhotoEditorBtn.addEventListener('keydown', closeEditorByKey);

  var uploadFile = document.querySelector('#upload-file');
  uploadFile.addEventListener('change', openEditor);

  closeEditor();
};
