/* eslint-disable no-restricted-syntax */
/* eslint-disable camelcase */
const form = document.querySelector('.apply__form');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const result = [];

  function createWarning(node) {
    if (!node.querySelectorAll('.warning__msg').length) {
      /* eslint camelcase: ["error", {properties: "never"}] */
      const warning__msg = document.createElement('p');
      warning__msg.innerHTML = '請填入資料';
      warning__msg.classList.add('warning__msg');
      node.appendChild(warning__msg);
    }
  }

  function isValid(node, value) {
    if (!node.querySelectorAll('.warning__msg').length) {
      if (value) {
        return;
      }
      createWarning(node);
    } else if (value) {
      node.lastChild.classList.add('warning__disappear');
    }
  }

  // Check the required answer for name, phone, email, resource
  const reqAnswers = document.querySelectorAll('.required .answer');
  for (const reqAnswer of reqAnswers) {
    isValid(reqAnswer.parentNode, reqAnswer.value);
    result.push(reqAnswer.value);
  }

  // Check the required answer for the type of applying event
  const radios = document.querySelectorAll('input[type=radio]');
  for (const radio of radios) {
    const resp = [...radios].some((element) => {
      // eslint-disable-next-line no-unneeded-ternary
      const checkStatus = element.checked ? true : false;
      return checkStatus;
    });

    if (radio.checked) {
      result.push(radio.nextElementSibling.innerHTML);
    }

    isValid(radio.parentNode.parentNode, resp);
  }
  // Check whether the given phone pattern is correct or not
  const phoneFormat = /^\d{10}$/;
  const phone = document.getElementById('number');
  if (!phoneFormat.test(phone.value)) {
    phone.classList.add('wrong__format');
  } else {
    phone.classList.remove('wrong__format');
  }

  // check if every blank is filled
  /* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */
  for (let i = 0; i < result.length; i++) {
    if (result[i] === '') {
      return null;
    }
  }
  return alert(result); // eslint-disable-line no-alert
});
