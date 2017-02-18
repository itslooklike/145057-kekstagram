'use strict';

window.picture = (function () {
  var url = 'https://intensive-javascript-server-myophkugvq.now.sh/kekstagram/data';
  var picturesContainer = document.querySelector('.pictures');

  var imgGenerate = function (elem, container) {
    var elementToClone = document.querySelector('#picture-template').content.querySelector('.picture');
    var fragment = document.createDocumentFragment();

    elem.forEach(function (value) {
      var newElement = elementToClone.cloneNode(true);

      newElement.querySelector('img').src = value.url;
      newElement.querySelector('.picture-comments').textContent = value.comments.length;
      newElement.querySelector('.picture-likes').textContent = value.likes;
      fragment.appendChild(newElement);
    });

    container.appendChild(fragment);
  };

  var getData = function (data) {
    imgGenerate(JSON.parse(data), picturesContainer);
  };

  window.load(url, getData);

  var openGallery = function (evt) {
    if (window.utils.isActivationEvent(evt)) {
      evt.preventDefault();
      var target = evt.target;
      while (target !== picturesContainer) {
        if (target.tagName === 'A') {
          window.showGallery.showGalleryInit(target);
          return;
        }
        target = target.parentNode;
      }
    }
  };

  picturesContainer.addEventListener('click', openGallery);
  picturesContainer.addEventListener('keydown', openGallery);
})();
