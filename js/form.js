'use strict';

(function () {
  var scaleControlWrap = document.querySelector('.upload-resize-controls');
  var picture = document.querySelector('.filter-image-preview');
  var filtersWrap = document.querySelector('.upload-filter-controls');

  var editorWindow = document.querySelector('.upload-overlay');
  var uploadImageForm = document.querySelector('#upload-select-image');
  var uploadFile = document.querySelector('#upload-file');
  var closePhotoEditorBtn = document.querySelector('.upload-form-cancel');

  var applyFilter = function (oldFilter, newFilter) {
    picture.classList.remove(oldFilter);
    picture.classList.add(newFilter);
  };

  var INITIAL_SCALE = 100;
  var SCALE_STEP = 25;

  var setPictureScale = function (scale) {
    picture.style.transform = 'scale(' + parseInt(scale, 10) / 100 + ')';
  };

  var scale = window.initializeScale(scaleControlWrap, SCALE_STEP, INITIAL_SCALE, setPictureScale);

  var filters = window.initializeFilters(filtersWrap, applyFilter);

  var windowCloseHandler = window.utils.runCallbackIfDeactivate.bind(window.utils.runCallbackIfDeactivate, closeEditor);

  function editorOpenHandler() {
    window.addEventListener('keydown', windowCloseHandler);
    filters.subscribe();
    scale.subscribe();
    closePhotoEditorBtn.addEventListener('click', closeEditorHandler);
    closePhotoEditorBtn.addEventListener('keydown', closeEditorHandler);
    uploadFile.removeEventListener('change', editorOpenHandler);
    editorWindow.classList.remove('invisible');
    uploadImageForm.classList.add('invisible');
    uploadImageForm.attributes['aria-pressed'].value = 'true';
  }

  function closeEditor() {
    window.removeEventListener('keydown', windowCloseHandler);
    filters.unsubscribe();
    scale.unsubscribe();
    closePhotoEditorBtn.removeEventListener('click', closeEditorHandler);
    closePhotoEditorBtn.removeEventListener('keydown', closeEditorHandler);
    uploadFile.addEventListener('change', editorOpenHandler);
    editorWindow.classList.add('invisible');
    uploadImageForm.classList.remove('invisible');
    uploadImageForm.attributes['aria-pressed'].value = 'false';
    uploadImageForm.reset();
  }

  function closeEditorHandler(evt) {
    if (window.utils.isActivationEvent(evt)) {
      closeEditor();
    }
  }

  closeEditor();
})();
