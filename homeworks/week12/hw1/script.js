/* eslint-env jquery */
const siteKey = 'oscar';
const loadMorebtn = "<button class='load_btn btn mt-4'>Load More</button>";
const msgSection = $('.msg_section');
let lastId = null;
let isEnd = false;

/* eslint-disable */
function encodeHTML(input) {
  return input.replace(/\&/g, '&amp;')
    .replace(/\</g, '&lt;')
    .replace(/\>/g, '&gt;')
    .replace(/\"/g, '&quot;')
    .replace(/\'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}
/* eslint-disable */

function appendMsgToDOM(container, msg, isPrepend) {
  const htmlContent = `
    <div class="card mt-4">
      <div class="card-body d-flex flex-column">
        <h5 class="card-title">${encodeHTML(msg.nickname)}</h5>
        <p class="card-text">${encodeHTML(msg.content)}</p>
        <p class="card_created_time align-self-end">${msg.created_at}</p>
      </div>
    </div>
  `;
  if (isPrepend) {
    container.prepend(htmlContent);
  } else {
    container.append(htmlContent);
  }
}

// Only for get message
function getMsgsAPI(key, before, cb) {
  let url = `http://localhost/w12/hw1/api_message.php?site_key=${key}`;
  if (before) {
    url += '&before=' + before;
  }
  $.ajax({
    url,
  }).done((data) => {
    cb(data);
  });
}

function getMsgs() {
  $('.load_btn').hide();
  if (isEnd) return;
  getMsgsAPI(siteKey, lastId, (data) => {
    if (!data.result) {
      /* eslint-disable no-alert */
      alert(data.message);
      return;
    }
    /* eslint-disable */
    const messages = data.messages;
    for (const msg of messages) {
      appendMsgToDOM(msgSection, msg);
    }

    if (messages.length === 0) {
      isEnd = true;
    } else {
      lastId = messages[messages.length - 1].id;
      msgSection.append(loadMorebtn);
    }
  });
}

$(document).ready(() => {
  getMsgs();
  msgSection.on('click', '.load_btn', () => {
    getMsgs();
  });

  $('.add_msg_form').submit((e) => {
    e.preventDefault();
    const newMsgData = {
      site_key: 'Oscar',
      nickname: $('input[name=nickname]').val(),
      content: $('textarea[name=content]').val(),
    };

    $.ajax({
      type: 'POST',
      url: 'http://localhost/w12/hw1/api_add_message.php',
      data: newMsgData,
    }).done((data) => {
      if (!data.result) {
        /* eslint-disable no-alert */
        alert(data.message);
        return;
      }
      $('input[name=nickname]').val('');
      $('textarea[name=content]').val('');
      appendMsgToDOM(msgSection, newMsgData, true);
    });
  });
});
