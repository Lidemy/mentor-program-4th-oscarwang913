const baseAPI = 'https://api.twitch.tv/kraken/';
const topGameAPI = `${baseAPI}games/top?limit=5`;
const streamApi = `${baseAPI}streams/`;
const clientID = '5npghe3kytuifte3z9kvwnto50mqch';
let offset = 0;

const navList = document.querySelector('.navbar-nav');
const streamsContainer = document.querySelector('.streams');
const carousel = document.querySelector('.carousel-inner');
const searchInput = document.querySelector('.stream_navbar__search_form_input');
const gameTitle = document.querySelector('.gameTitle');


function fetchTopgames() {
  return fetch(`${topGameAPI}`, {
    method: 'GET',
    headers: {
      'Client-ID': clientID,
      Accept: 'application/vnd.twitchtv.v5+json',
    },
    /* eslint-disable */
  }).then((resp) => {
    if (resp.status >= 200 && resp.status < 300) {
      return resp.json();
    }
  });
}
/* eslint-enable */

function fetchStreams(gameNameParam, offsetParam) {
  return fetch(`${streamApi}?game=${gameNameParam}&limit=25&offset=${offsetParam}`, {
    method: 'GET',
    headers: {
      'Client-ID': clientID,
      Accept: 'application/vnd.twitchtv.v5+json',
    },
    /* eslint-disable */
  }).then((resp) => {
    if (resp.status >= 200 && resp.status < 300) {
      return resp.json();
    }
  });
}
/* eslint-enable */

function navbarTemplate(gameName) {
  return `
    <li class="nav-item">
      <a class="nav-link" href="#">${gameName}</a>
    </li>
  `;
}

function carouselTemplate(gameNameurl) {
  return `
      <div class="col-ms-12 col-md-12 pl-0 pr-0 d-flex align-items-center justify-content-center">
        <img class="image" src="https://static-cdn.jtvnw.net/ttv-boxart/${gameNameurl}-272x380.jpg" alt="First slide">
      </div>  
  `;
}

function streamTemplate(cardImage, streamerName, viewerCount) {
  return `
      <div class="stream card">
        <img src="${cardImage}" class="stream-img-top" alt="stream-image">
        <div class="stream-body card-body d-flex flex-column align-items-start">
          <h5 class="stream-body__streamer--name">${streamerName}</h5>
          <p class="stream-body__viewer_count">Viewers: ${viewerCount}</p>
          <a href="#" class="btn stream-body__more_btn align-self-end">More</a>
        </div>
      </div>
  `;
}

// initialize the page
document.addEventListener('DOMContentLoaded', () => {
  fetchTopgames()
    .then((data) => {
      const topGames = [...data.top];
      const gameName = topGames[0].game.name;
      const defaultGamename = encodeURIComponent(gameName);
      let topGamestr = '';
      /*eslint-disable */
      topGames.map((topGame) => {
        topGamestr += navbarTemplate(topGame.game.name);
      });
      /* eslint-enable */
      navList.innerHTML = topGamestr;
      carousel.innerHTML = carouselTemplate(defaultGamename);
      // if navbar is created
      if (navList) {
        gameTitle.innerText = gameName;
        const firstChild = navList.firstElementChild.firstElementChild;
        firstChild.classList.add('activeColor');
      }
    })
    .catch((error) => {
      console.log(error);
    });

  navList.addEventListener('click', (e) => {
    streamsContainer.innerHTML = '';
    carousel.innerHTML = '';
    const gameName = e.target.innerText;
    gameTitle.innerHTML = gameName;
    carousel.innerHTML = carouselTemplate(encodeURIComponent(gameName));

    // navbar color exchange
    const currentPage = document.querySelector('.activeColor');
    if (e.target.classList.contains('activeColor')) return;
    currentPage.classList.remove('activeColor');
    e.target.classList.add('activeColor');
  });

  // search function
  searchInput.addEventListener('keyup', () => {
    const inputValue = searchInput.value;
    const regex = new RegExp(inputValue, 'i');
    const streamNames = [...document.querySelectorAll('.stream-body__streamer--name')];
    streamNames.forEach((streamName) => {
      if (!streamName.innerText.match(regex)) {
        streamName.parentNode.parentNode.parentNode.classList.add('hide');
      } else {
        streamName.parentNode.parentNode.parentNode.classList.remove('hide');
      }
    });
  });
});

// scrolling down and load more data
const observerTarget = document.querySelector('.observer');
const options = {
  root: null,
  threshold: 0.5,
};

/*eslint-disable */
const observer = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    if (entry.isIntersecting) {
      const gameURLname = encodeURIComponent(gameTitle.innerText);
      fetchStreams(gameURLname, offset)
        .then((data) => {
          const streams = [...data.streams];
          streams.map((stream) => {
            const streamContainer = document.createElement('div');
            streamContainer.classList.add('col-xs-12');
            streamContainer.classList.add('col-ms-12');
            streamContainer.classList.add('col-md-4');
            streamContainer.classList.add('stream-container');

            streamContainer.innerHTML = streamTemplate(stream.preview.large, stream.channel.name, stream.viewers);
            streamsContainer.appendChild(streamContainer);
          });
        })
        .catch((error) => {
          console.log(error);
        });
      offset += 25;
    }
  }
}, options);
observer.observe(observerTarget);
