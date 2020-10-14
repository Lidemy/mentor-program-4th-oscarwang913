/*eslint-disable */

import { getMsgsAPI, addMsgs } from './api';
import { appendMsgToDOM } from './utils';
import { getLoadMoreBtn, getForm } from './template';
import $ from 'jquery';

// Initial screen
export function init(options) {
  let apiUrl = '';
  let containerElement = null;
  let lastId = null;
  let isEnd = false;
  let siteKey = '';
  let loadMoreClassname;
  let formClassname;
  let formSelector;
  let msgsClassname;
  let msgsSelector;

  siteKey = options.siteKey;
  apiUrl = options.apiUrl;
  containerElement = $(options.container);
  loadMoreClassname = `${siteKey}_load-more`;
  formClassname = `${siteKey}_form`;
  msgsClassname = `${siteKey}_msgs`;
  formSelector = '.' + formClassname;
  msgsSelector = `.${msgsClassname}`;


  function getMsgs() {
    $(`.${loadMoreClassname}`).hide();
    if (isEnd) return;
    getMsgsAPI(apiUrl, siteKey, lastId, (data) => {
      if (!data.result) {
        alert(data.message); // eslint-disable-line no-alert
        return;
      }
      const messages = data.messages;
      for (const msg of messages) {
        appendMsgToDOM($(msgsSelector), msg);
      }

      if (messages.length === 0) {
        isEnd = true;
      } else {
        lastId = messages[messages.length - 1].id;
        const loadMoreBtnHTML = getLoadMoreBtn(loadMoreClassname);
        $(msgsSelector).append(loadMoreBtnHTML);
      }
    });
  }

  containerElement.append(getForm(formClassname, msgsClassname));
  getMsgs();
  $(msgsSelector).on('click', `.${loadMoreClassname}`, () => {
    getMsgs();
  });

  $(formSelector).submit((e) => {
    e.preventDefault();
    const newMsgData = {
      site_key: `${siteKey}`,
      nickname: $(`${formSelector} input[name=nickname]`).val(),
      content: $(`${formSelector} textarea[name=content]`).val(),
    };

    addMsgs(apiUrl, siteKey, newMsgData, (data) => {
      if (!data.result) {
        alert(data.message); // eslint-disable-line no-alert
        return;
      }
      $('input[name=nickname]').val('');
      $('textarea[name=content]').val('');
      appendMsgToDOM($(msgsSelector), newMsgData, true);
    });
  });
}
