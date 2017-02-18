'use strict';

window.picture = (function () {
  var url = 'https://intensive-javascript-server-myophkugvq.now.sh/kekstagram/data';
  var picArray = [];
  var picturesContainer = document.querySelector('.pictures');
  var filters = document.querySelector('.filters');

  var sortPicsRandom = function () {
    var sorted = [];

    while (sorted.length < 10) {
      var element = window.utils.getRandomElement(picArray);

      var flag = sorted.some(function (value) {
        return value === element;
      });

      if (!flag) {
        sorted.push(element);
      }
    }

    return sorted;
  };

  var sortPicsComments = function () {
    var sorted = picArray.slice(0);
    sorted.sort(function (itemA, itemB) {
      return itemB.comments.length - itemA.comments.length;
    });

    return sorted;
  };

  var imgAppend = function (fragment) {
    picturesContainer.innerHTML = '';
    picturesContainer.appendChild(fragment);
  };

  var imgGenerate = function (elem) {
    var elementToClone = document.querySelector('#picture-template').content.querySelector('.picture');
    var fragment = document.createDocumentFragment();

    elem.forEach(function (value) {
      var newElement = elementToClone.cloneNode(true);

      newElement.querySelector('img').src = value.url;
      newElement.querySelector('.picture-comments').textContent = value.comments.length;
      newElement.querySelector('.picture-likes').textContent = value.likes;
      fragment.appendChild(newElement);
    });

    imgAppend(fragment);
  };

  var getData = function (data) {
    imgGenerate(picArray = JSON.parse(data));
    filters.classList.remove('hidden');
  };

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

  var picFilterHandler = function (evt) {
    switch (evt.target.id) {
      case 'filter-new':
        imgGenerate(sortPicsRandom());
        break;
      case 'filter-discussed':
        imgGenerate(sortPicsComments());
        break;
      case 'filter-popular':
        imgGenerate(picArray);
        break;
    }
  };

  window.load(url, getData);

  filters.addEventListener('click', picFilterHandler);
  picturesContainer.addEventListener('click', openGallery);
  picturesContainer.addEventListener('keydown', openGallery);
})();
