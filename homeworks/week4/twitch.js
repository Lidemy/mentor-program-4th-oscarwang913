const request = require('request');
const process = require('process');

// 變數
const args = process.argv[2];
let offset = 0;
let flag = false;
const clientID = 'agdn5682y521syqhwkdrqmw7ho6v7d';

function getGameInfo(gamename, pagination, clientid) {
  request(
    {
      method: 'GET',
      url: `https://api.twitch.tv/kraken/streams/?game=${gamename}&limit=100&offset=${pagination}`,
      headers: {
        'Client-ID': clientid,
        Accept: 'application / vnd.twitchtv.v5 + json',
      },
    },
    (err, res, body) => {
      if (!flag) {
        flag = true;
        if (err) {
          console.log('Error', err);
          return;
        }
        const data = JSON.parse(body);

        const result = data.streams;

        if (data.status === 404) {
          console.log('抓取失敗!');
        }

        for (let j = 0; j < result.length; j++) {
          /* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
          console.log(result[j].channel._id, result[j].channel.display_name);
        }
        flag = false;
      }
    },
  );
}
/* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */
for (let i = 0; i < 2; i++) {
  getGameInfo(args, offset, clientID);
  offset += 100;
}
