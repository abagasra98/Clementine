(function() {
  var addButton = document.querySelector('.btn-add');
  var deleteButton = document.querySelector('.btn-delete');
  var clickNbr = document.querySelector('#click-nbr');
  var apiUrl = 'http://localhost:8080/api/clicks';

  function ready(fn) {
    if (typeof fn != 'function')
      return;

    if (document.readyState === 'complete')
      return fn();

    document.addEventListener('DOMContentLoaded', fn, false);
  }

  function ajaxRequest(method, url, callback) {
    var xmlHttp = new XMLHttpRequest();

    xmlHttp.onreadystatechange = function() {
      if (xmlHttp.readyState === 4 && xmlHttp.status === 200)
        callback(xmlHttp.response);
    };

    xmlHttp.open(method, url, true);
    xmlHttp.send()
  }

  function updateClickCount(data) {
    var clickObject = JSON.parse(data);
    clickNbr.innerHTML = clickObject.clicks;
  }

  ready(ajaxRequest('GET', apiUrl, updateClickCount));

  addButton.addEventListener('click', function() {
    ajaxRequest('POST', apiUrl, function() {
      ajaxRequest('GET', apiUrl, updateClickCount);
    })
  }, false);

  deleteButton.addEventListener('click', function() {
    ajaxRequest('DELETE', apiUrl, function() {
      ajaxRequest('GET', apiUrl, updateClickCount)
    })
  }, false);

  
})();