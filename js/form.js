'use strict';

window.onload = function () {
  var maxZoom = 100;
  var incStep = 25;
  var scaleControlWrap = document.querySelector('.upload-resize-controls');

  var editorWindow = document.querySelector('.upload-overlay');
  var uploadImageForm = document.querySelector('#upload-select-image');
  var uploadFile = document.querySelector('#upload-file');
  var closePhotoEditorBtn = document.querySelector('.upload-form-cancel');

  function openEditor() {
    window.addEventListener('keydown', globalCloseEditorHandler);
    window.initializeFilters.editorFilterReset();
    window.initializeFilters.initFiltersListeners();
    window.createScale.pictureScaleReset();
    window.createScale.initScaleListeners(scaleControlWrap, incStep, maxZoom);
    closePhotoEditorBtn.addEventListener('click', closeEditorHandler);
    closePhotoEditorBtn.addEventListener('keydown', closeEditorHandler);
    uploadFile.removeEventListener('change', openEditor);

    editorWindow.classList.remove('invisible');
    uploadImageForm.classList.add('invisible');
  }

  function closeEditor() {
    window.removeEventListener('keydown', globalCloseEditorHandler);
    window.initializeFilters.removeFiltersListeners();
    window.createScale.removeScaleListeners(scaleControlWrap);
    closePhotoEditorBtn.removeEventListener('click', closeEditorHandler);
    closePhotoEditorBtn.removeEventListener('keydown', closeEditorHandler);
    uploadFile.addEventListener('change', openEditor);

    editorWindow.classList.add('invisible');
    uploadImageForm.classList.remove('invisible');
    uploadImageForm.reset();
  }

  function closeEditorHandler(evt) {
    if (window.utils.isActivationEvent(evt)) {
      closeEditor();
    }
  }

  function globalCloseEditorHandler(evt) {
    if (window.utils.isDeactivationEvent(evt)) {
      closeEditor();
    }
  }

  closeEditor();
};
