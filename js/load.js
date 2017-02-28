'use strict';

window.loadData = (function () {
  var XHR_TIMEOUT = 60000;

  return function (url, callback) {
    var xhr = new XMLHttpRequest();

    xhr.open('GET', url);
    xhr.addEventListener('load', function (evt) {
      try {
        if (typeof callback === 'function') {
          callback(evt.target.response);
        }
      } catch (err) {
        // error handler
      }
    });
    xhr.timeout = XHR_TIMEOUT;
    xhr.send();
  };
})();
