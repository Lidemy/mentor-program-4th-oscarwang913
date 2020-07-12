const request = require('request');

const apiUrl = 'https://idemy-book-store.herokuapp.com';

request.get(`${apiUrl}/books?_limit=10`, (err, res, body) => {
  // 如果錯誤，在throw後面的code都不會執行
  // if (err) throw '抓取失敗';
  if (err) {
    console.log('抓取失敗', err);
    return;
  }
  let result;
  try {
    result = JSON.parse(body);
  } catch (error) {
    console.log(error);
  }
  console.log(result);
});
