'use strict';

window.utils = function () {
  var picture = document.querySelector('.filter-image-preview');
  var zoomValue = document.querySelector('.upload-resize-controls-value');

  return {
    'KEY_CODE': {
      'enter': 13,
      'escape': 27
    },
    'editorFilterReset': function () {
      picture.classList.remove(window.appState.currentFilter);
    },
    'editorFilterChanger': function (newFilter) {
      this.editorFilterReset();
      picture.classList.add(window.appState.currentFilter = newFilter);
    },
    'pictureScaleSet': function (scale) {
      picture.style.transform = 'scale(' + parseInt(scale, 10) / 100 + ')';
    },
    'pictureZoomValueSet': function (zoom) {
      zoomValue.value = zoom + '%';
      this.pictureScaleSet(zoom);
    },
    'pictureZoomValueGet': function () {
      return parseInt(zoomValue.value, 10);
    }
  };
};
