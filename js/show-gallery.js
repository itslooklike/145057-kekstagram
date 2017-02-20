'use strict';

window.showGallery = (function () {
  var galleryOverlay = document.querySelector('.gallery-overlay');
  var overlayClose = document.querySelector('.gallery-overlay-close');
  var img = document.querySelector('.gallery-overlay-image');
  var comments = document.querySelector('.comments-count');
  var likes = document.querySelector('.likes-count');

  var fillContent = function (target) {
    img.src = target.querySelector('img').src;
    comments.textContent = target.querySelector('.picture-comments').textContent;
    likes.textContent = target.querySelector('.picture-likes').textContent;
    galleryOverlay.classList.remove('invisible');
    overlayClose.focus();
  };

  var closeDialog = function () {
    galleryOverlay.classList.add('invisible');
    overlayClose.removeEventListener('click', closeDialog);
    overlayClose.removeEventListener('keydown', closeDialog);
    window.removeEventListener('keydown', globalCloseEsc);
  };

  var globalClose = window.utils.globalActivation.bind(window.utils.globalActivation, closeDialog);
  var globalCloseEsc = window.utils.globalCloser.bind(window.utils.globalCloser, closeDialog);

  return {
    showGalleryInit: function (target) {
      fillContent(target);
      overlayClose.addEventListener('click', globalClose);
      overlayClose.addEventListener('keydown', globalClose);
      window.addEventListener('keydown', globalCloseEsc);
    }
  };
})();
