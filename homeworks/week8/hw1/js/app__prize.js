const prizeSection = document.querySelector('.prize_section');
const prizeDesc = document.querySelector('.prize__desc');


// create a XMLHttpRequest object
const request = new XMLHttpRequest();
const apiUrl = 'https://dvwhnbka7d.execute-api.us-east-1.amazonaws.com/default/lottery';

// The statement for each prize
const firstStatement = '恭喜你中頭獎了！日本東京來回雙人遊！';
const secondStatement = '二獎！90 吋電視一台！';
const thirdStatement = '恭喜你抽中三獎：知名 YouTuber 簽名握手會入場券一張，bang！';


// A function for calling API, only
function draw(callback) {
  request.open('GET', apiUrl);
  request.onload = function () {
    // Make sure that the status code is between 200~400
    if (request.status >= 200 && request.status < 400) {
      let data;
      try {
        data = JSON.parse(request.responseText);
      } catch (err) {
        callback(err);
        return;
      }
      if (!data.prize) {
        callback('系統不穩定，請再試一次');
        return;
      }
      // if there is no error, then call callback function. Put the return data to callback
      callback(null, data);
    } else {
      alert('系統不穩定，請再試一次');// eslint-disable-line no-alert
    }
  };
  request.onerror = function () {
    alert('系統不穩定，請再試一次');// eslint-disable-line no-alert
  };
  request.send();
}

prizeSection.addEventListener('click', (e) => {
  if (e.target.classList.contains('btn')) {
    prizeDesc.classList.add('hidden');
    /* eslint func-names: ["error", "never"] */
    draw((err, data) => {
      if (err) {
        alert(err); // eslint-disable-line no-alert
        return;
      }
      // Create the prize message
      function createPrize(statement) {
        const getPrize = document.createElement('div');
        getPrize.classList.add('get__prize');
        getPrize.innerHTML = `
          <p class='congrats'>${statement}</p>
          <button class='getBtn'>我要抽獎</button>
        `;
        prizeSection.appendChild(getPrize);
      }
      // switch different background by different prize
      const result = data.prize.toLowerCase();
      switch (result) {
        case 'first':
          prizeSection.classList.add('first');
          createPrize(firstStatement);
          break;
        case 'second':
          prizeSection.classList.add('second');
          createPrize(secondStatement);
          break;
        case 'third':
          prizeSection.classList.add('third');
          createPrize(thirdStatement);
          break;
        default:
          prizeSection.classList.add('fourth');
          prizeSection.innerHTML = `
              <p class='appreciation'>銘謝惠顧</p>
            `;
      }
    });
  }
  if (e.target.classList.contains('getBtn')) {
    window.location.reload();
  }
});
