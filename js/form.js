'use strict';

window.onload = function () {
  var scaleControlWrap = document.querySelector('.upload-resize-controls');
  var picture = document.querySelector('.filter-image-preview');
  var filtersWrap = document.querySelector('.upload-filter-controls');

  var editorWindow = document.querySelector('.upload-overlay');
  var uploadImageForm = document.querySelector('#upload-select-image');
  var uploadFile = document.querySelector('#upload-file');
  var closePhotoEditorBtn = document.querySelector('.upload-form-cancel');

  var pictureScaleSet = function (scale) {
    picture.style.transform = 'scale(' + parseInt(scale, 10) / 100 + ')';
  };

  var applyFilter = function (oldFilter, newFilter) {
    picture.classList.remove(oldFilter);
    picture.classList.add(newFilter);
  };

  var scale = window.initializeScale(scaleControlWrap, pictureScaleSet);
  var filters = window.initializeFilters(filtersWrap, applyFilter);

  var globalClose = window.utils.globalCloser.bind(window.utils.globalCloser, closeEditor);

  function openEditor() {
    window.addEventListener('keydown', globalClose);
    filters.subscribe();
    scale.subscribe();
    closePhotoEditorBtn.addEventListener('click', closeEditorHandler);
    closePhotoEditorBtn.addEventListener('keydown', closeEditorHandler);
    uploadFile.removeEventListener('change', openEditor);
    editorWindow.classList.remove('invisible');
    uploadImageForm.classList.add('invisible');
  }

  function closeEditor() {
    window.removeEventListener('keydown', globalClose);
    filters.unsubscribe();
    scale.unsubscribe();
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

  closeEditor();
};
