const request = require('request');

// // 變數
const apiUrl = 'https://api.twitch.tv/kraken/games/top';
const clientID = 'agdn5682y521syqhwkdrqmw7ho6v7d';

const options = {
  method: 'GET',
  url: apiUrl,
  headers: {
    'Client-ID': clientID,
    Accept: 'application / vnd.twitchtv.v5 + json',
  },
};

request(options, (err, res, body) => {
  if (err) {
    console.log('出錯囉!', err);
    return;
  }

  let data;

  try {
    data = JSON.parse(body);
  } catch (error) {
    console.log(error);
    return;
  }

  if (data.status === 404) {
    console.log('抓取失敗');
    return;
  }
  let result = '';
  /* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */
  for (let i = 0; i < data.top.length; i++) {
    if (i === data.top.length - 1) {
      result += `Game name: ${data.top[i].game.name}, Viewers: ${data.top[i].viewers}}`;
    } else {
      result += `Game name: ${data.top[i].game.name}, Viewers: ${data.top[i].viewers}\n`;
    }
  }
  console.log(result);
});
