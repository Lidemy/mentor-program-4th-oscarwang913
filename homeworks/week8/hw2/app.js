const topFiveapi = 'https://api.twitch.tv/kraken/games/top?limit=5';
const streamApi = 'https://api.twitch.tv/kraken/streams/';
const streamBox = document.querySelector('#stream__box');
const navbar = document.querySelector('.navbar');

// Create the navbar
// eslint-disable-next-line
callAPI(topFiveapi, (err, data) => {
  if (err) {
    console.log(err);
    return;
  }
  const navList = document.querySelector('.nav__list');
  const results = data.top;
  let str = '';
  results.forEach((result) => {
    str += `
          <li>${result.game.name}</li>
        `;
  });
  navList.innerHTML = str;
});


// Function for creating stream items which are the first 20 items and the items after scrolling
function createStreamitem(input, streams) {
  const streamItem = document.createElement('div');
  streamItem.classList.add('stream');
  streamItem.innerHTML = `
      <p class="viewers">Viewers: ${input.viewers}</p>
      <img src="${input.preview.large}" alt="" class="preview">
      <div class="streamer">
        <img src="${input.channel.logo}" alt="" class="logo">
        <p class="name">${input.channel.name}</p>
        <p class="lang">${input.channel.broadcaster_language.toUpperCase()}</p>
      </div>
    `;
  streams.appendChild(streamItem);
}

// switch game and show the top 20 streams
navbar.addEventListener('click', (e) => {
  if (e.target.tagName.toLowerCase() === 'li') {
    streamBox.innerHTML = '';
    const gameName = e.target.innerText;
    // cover some special characters to the format server knows
    const gameNameforurl = encodeURIComponent(e.target.innerText);
    const streamResult = `${streamApi}?game=${gameNameforurl}&limit=100`;
    // eslint-disable-next-line
    callAPI(streamResult, (err, data) => {
      if (err) {
        console.log(err);
        return;
      }
      // Create Game title and top-20 statement
      const gameTitle = document.createElement('h2');
      gameTitle.classList.add('game__title');
      gameTitle.innerHTML = gameName;
      streamBox.appendChild(gameTitle);
      const topTwenty = document.createElement('h3');
      topTwenty.classList.add('top__twenty');
      topTwenty.innerHTML = 'Top 20 live streams sorted by current viewers';
      streamBox.appendChild(topTwenty);

      // create the selection list
      const selections = document.createElement('div');
      selections.classList.add('lang__options');
      selections.innerHTML = `
        <label for="language" class="lang__title">Language: </label>
        <select name="lang" id="language" class="langFilter">
          <option value="ALL">ALL</option>
          <option value="EN">EN</option>
          <option value="ZH">ZH</option>
          <option value="ES">ES</option>
          <option value="FR">FR</option>
          <option value="DE">DE</option>
          <option value="RU">RU</option>
          <option value="KO">KO</option>
          <option value="JA">JA</option>
          <option value="PT">PT</option>
          <option value="AR">AR</option>
        </select>
      `;
      streamBox.appendChild(selections);

      // Create stream
      const streams = document.createElement('div');
      streams.classList.add('streams');
      const results = data.streams;
      const resultsArray = results.slice(0, 20);
      resultsArray.forEach((stream) => {
        createStreamitem(stream, streams);
      });
      streamBox.appendChild(streams);
    });
  }
});

// filter function
streamBox.addEventListener('click', (e) => {
  const languageArray = [...document.querySelectorAll('.lang')];
  if (e.target.tagName.toLowerCase() === 'select') {
    languageArray.forEach((language) => {
      if (e.target.value.toLowerCase() === 'all') {
        language.parentNode.parentNode.classList.remove('hidden');
        return;
      }
      if (language.innerText.toLowerCase() !== e.target.value.toLowerCase()) {
        language.parentNode.parentNode.classList.add('hidden');
      } else {
        language.parentNode.parentNode.classList.remove('hidden');
      }
    });
  }
});

// function for loading more content
let loadingData = true;

document.addEventListener('scroll', () => {
  const lastStream = document.querySelector('.stream:last-child');
  const lastOffset = lastStream.offsetTop + lastStream.clientHeight;
  const pageOffset = window.pageYOffset + window.innerHeight;
  const gameNameforurl = encodeURIComponent(document.querySelector('.game__title').innerText);
  const streamResult = `${streamApi}?game=${gameNameforurl}&limit=100`;
  if ((pageOffset > lastOffset - 20) && loadingData) {
    // eslint-disable-next-line
    callAPI(streamResult, (err, data) => {
      if (err) {
        console.log(err);
        return;
      }
      // Create stream
      const existStreams = document.querySelector('.streams');
      const results = data.streams;
      for (let i = 20; i < results.length; i += 20) {
        const startPoint = i + 1;
        const endPoint = i + 20;
        const resultsArray = results.slice(startPoint, endPoint);
        resultsArray.forEach((stream) => {
          createStreamitem(stream, existStreams);
        });
      }
      streamBox.appendChild(existStreams);
    });
    loadingData = false;
  }
});
