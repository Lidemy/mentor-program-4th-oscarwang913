const request = require('request');
const process = require('process');

// 變數
const args = process.argv;
const countryname = args[2];
const apiUrl = `https://restcountries.eu/rest/v2/name/${countryname}`;

request(apiUrl, (err, res, body) => {
  // 如果沒有輸入國家名稱的話，就會跳出此訊息
  if (!countryname) {
    console.log('請填入國家名稱');
    return;
  }

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

  // 如果輸入不對的國家名稱，則顯示找不到國家資訊
  if (data.status === 404) {
    console.log('找不到國家資訊');
    return;
  }

  let str = '============\n';
  /* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */
  for (let i = 0; i < data.length; i++) {
    if (i === data.length - 1) {
      str += `國家:${data[i].name}\n首都:${data[i].capital}\n貨幣:${data[i].currencies[0].code}\n國碼:${data[i].callingCodes[0]}`;
    } else {
      str += `國家: ${data[i].name} \n首都: ${data[i].capital} \n貨幣: ${data[i].currencies[0].code} \n國碼: ${data[i].callingCodes[0]} \n============\n`;
    }
  }
  console.log(str);
});
