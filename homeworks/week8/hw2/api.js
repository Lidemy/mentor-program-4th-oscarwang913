const clientID = '5npghe3kytuifte3z9kvwnto50mqch';
const request = new XMLHttpRequest();


// function for calling API
// eslint-disable-next-line
function callAPI(url, cb) {
  request.open('GET', url, true);
  // Add the client id and Accept
  request.setRequestHeader('Client-ID', clientID);
  request.setRequestHeader('Accept', 'application/vnd.twitchtv.v5+json');
  request.onload = function () {
    if (request.status >= 200 && request.status < 400) {
      let data;
      try {
        data = JSON.parse(request.response);
      } catch (err) {
        cb(err);
        return;
      }
      if (!data) {
        return;
      }
      cb(null, data);
    }
  };
  /* eslint func-names: ["error", "never"] */
  request.onerror = function () {
    alert('error'); // eslint-disable-line no-alert
  };
  request.send();
}
