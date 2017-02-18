'use strict';

window.load = function (url, onLoad) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.addEventListener('readystatechange', function (evt) {
    if (evt.target.readyState === 4) {
      try {
        if (typeof onLoad === 'function') {
          onLoad(evt.target.response);
        }
      } catch (err) {
        // error handler
      }
    }
  });
  xhr.timeout = 60000;
  xhr.send();
};
