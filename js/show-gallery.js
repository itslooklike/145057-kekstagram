'use strict';

window.showGallery = (function () {
  var galleryOverlay = document.querySelector('.gallery-overlay');
  var overlayClose = document.querySelector('.gallery-overlay-close');
  var img = document.querySelector('.gallery-overlay-image');
  var comments = document.querySelector('.comments-count');
  var likes = document.querySelector('.likes-count');

  var HIDE_MARK = 'invisible';

  var contentFill = function (target) {
    img.src = target.querySelector('img').src;
    comments.textContent = target.querySelector('.picture-comments').textContent;
    likes.textContent = target.querySelector('.picture-likes').textContent;
    galleryOverlay.classList.remove(HIDE_MARK);
    overlayClose.focus();
  };

  var dialogClose = function () {
    galleryOverlay.classList.add(HIDE_MARK);
    overlayClose.removeEventListener('click', windowCloseHandler);
    overlayClose.removeEventListener('keydown', windowCloseHandler);
    window.removeEventListener('keydown', windowCloseEscHandler);
  };

  var windowCloseHandler = window.utils.runCallbackIfActivate.bind(window.utils.runCallbackIfActivate, dialogClose);
  var windowCloseEscHandler = window.utils.runCallbackIfDeactivate.bind(window.utils.runCallbackIfDeactivate, dialogClose);

  return {
    showGalleryInit: function (target) {
      contentFill(target);
      overlayClose.addEventListener('click', windowCloseHandler);
      overlayClose.addEventListener('keydown', windowCloseHandler);
      window.addEventListener('keydown', windowCloseEscHandler);
    }
  };
})();
