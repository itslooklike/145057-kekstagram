'use strict';

window.onload = function () {

  var scaleControlWrap = document.querySelector('.upload-resize-controls');
  var picture = document.querySelector('.filter-image-preview');

  var editorWindow = document.querySelector('.upload-overlay');
  var uploadImageForm = document.querySelector('#upload-select-image');
  var uploadFile = document.querySelector('#upload-file');
  var closePhotoEditorBtn = document.querySelector('.upload-form-cancel');

  var pictureScaleSet = function (scale) {
    picture.style.transform = 'scale(' + parseInt(scale, 10) / 100 + ')';
  };

  function openEditor() {
    window.addEventListener('keydown', globalCloseEditorHandler);
    window.initializeFilters.editorFilterReset();
    window.initializeFilters.initFiltersListeners();
    window.createScale.initializeScale(scaleControlWrap, pictureScaleSet);
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
