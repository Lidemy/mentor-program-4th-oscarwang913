// eslint-disable-next-line
import $ from 'jquery';


export function getMsgsAPI(apiUrl, siteKey, before, cb) {
  let url = `${apiUrl}/api_message.php?site_key=${siteKey}`;
  if (before) {
    /* eslint-disable */
    url += '&before=' + before;
    /* eslint-enable */
  }
  $.ajax({
    url,
  }).done((data) => {
    cb(data);
  });
}

export function addMsgs(apiUrl, siteKey, data, cb) {
  $.ajax({
    type: 'POST',
    url: `${apiUrl}/api_add_message.php`,
    data,
    /* eslint-disable */
  }).done((data) => {
    cb(data);
  });
}
