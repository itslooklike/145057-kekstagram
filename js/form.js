'use strict';

window.onload = function () {
  (function initPhotoEditor() {
    var editorWindow = document.querySelector('.upload-overlay');
    var uploadImageForm = document.querySelector('#upload-select-image');

    var maxZoom = 100;
    var incStep = 25;
    var decStep = -incStep;
    var inc = document.querySelector('.upload-resize-controls-button-inc');
    var dec = document.querySelector('.upload-resize-controls-button-dec');
    var filtersWrap = document.querySelector('.upload-filter-controls');

    function openEditor() {
      editorWindow.classList.remove('invisible');
      uploadImageForm.classList.add('invisible');
      window.createScale(inc, incStep, maxZoom);
      window.createScale(dec, decStep, maxZoom);
      window.initializeFilters(filtersWrap);
    }

    function closeEditor() {
      editorWindow.classList.add('invisible');
      uploadImageForm.classList.remove('invisible');
      // filtersWrap.removeEventListener('click', filterChanger);
      // filtersWrap.removeEventListener('keydown', filterChanger);
      // inc.removeEventListener('click', changeZoom);
      // dec.removeEventListener('click', changeZoom);
      // линтер ругается, да и наверно как-то это по другому делается
    }

    function closeEditorByKey(evt) {
      if (evt.keyCode === window.utils.KEY_CODE.escape || evt.type === 'click') {
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
  })();
};
