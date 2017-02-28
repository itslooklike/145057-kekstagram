'use strict';

(function () {
  var PICTURES_DATA_URL = 'https://intensive-javascript-server-myophkugvq.now.sh/kekstagram/data';
  var picturesCollection = [];
  var picturesContainer = document.querySelector('.pictures');
  var filters = document.querySelector('.filters');

  var sortRandomPictures = function (amount) {
    var sorted = [];

    while (sorted.length < amount) {
      var randomPicture = window.utils.getRandomElement(picturesCollection);

      if (sorted.indexOf(randomPicture) === -1) {
        sorted.push(randomPicture);
      }
    }

    return sorted;
  };

  var sortPicturesByComments = function () {
    var sorted = picturesCollection.slice(0);

    sorted.sort(function (picA, picB) {
      return picB.comments.length - picA.comments.length;
    });

    return sorted;
  };

  var appendPictures = function (fragment) {
    picturesContainer.innerHTML = '';
    picturesContainer.appendChild(fragment);
  };

  var elementToClone = document.querySelector('#picture-template').content.querySelector('.picture');

  var generateImageFragment = function (picturesArray) {
    var fragment = document.createDocumentFragment();

    picturesArray.forEach(function (pic) {
      var newElement = elementToClone.cloneNode(true);

      newElement.querySelector('img').src = pic.url;
      newElement.querySelector('.picture-comments').textContent = pic.comments.length;
      newElement.querySelector('.picture-likes').textContent = pic.likes;
      fragment.appendChild(newElement);
    });

    appendPictures(fragment);
  };

  var picturesDataLoadHandler = function (data) {
    generateImageFragment(picturesCollection = JSON.parse(data));
    filters.classList.remove('hidden');
  };

  var PICTURE_BOX = 'picture';

  var galleryOpenHandler = function (evt) {
    if (window.utils.isActivationEvent(evt)) {
      evt.preventDefault();
      var target = evt.target;
      while (target !== picturesContainer) {
        if (target.classList.contains(PICTURE_BOX)) {
          window.showGallery.showGalleryInit(target);
          return;
        }
        target = target.parentNode;
      }
    }
  };

  var PICTURES_BY_NAME = 'filter-new';
  var PICTURES_BY_DISCUSSED = 'filter-discussed';
  var PICTURES_BY_POPULAR = 'filter-popular';
  var SORTED_PICTURES_AMOUNT = 10;

  var pictureFilterHandler = function (evt) {
    switch (evt.target.id) {
      case PICTURES_BY_NAME:
        generateImageFragment(sortRandomPictures(SORTED_PICTURES_AMOUNT));
        break;
      case PICTURES_BY_DISCUSSED:
        generateImageFragment(sortPicturesByComments());
        break;
      case PICTURES_BY_POPULAR:
        generateImageFragment(picturesCollection);
        break;
    }
  };

  window.loadData(PICTURES_DATA_URL, picturesDataLoadHandler);

  filters.addEventListener('click', pictureFilterHandler);
  picturesContainer.addEventListener('click', galleryOpenHandler);
  picturesContainer.addEventListener('keydown', galleryOpenHandler);
})();
