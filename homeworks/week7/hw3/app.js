// Display for Weekday
const weekday = document.querySelector('.weekday');
const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const today = new Date();
// Using today.getDay() to get the numer from 0 - 6, representing the day of the week
const day = weekdays[today.getDay()];
weekday.innerHTML = day;


// add to-do item
const addToDo = document.querySelector('.add__todo');
const toDoBox = document.querySelector('.todo__box');

// Important!!! To avoid users tpye content like html tag
function escapeHtml(input) {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// add item
addToDo.addEventListener('keypress', (e) => {
  const inputValue = document.querySelector('.inputArea').value;
  if (e.keyCode === 13 && inputValue) {
    const toDoItem = document.createElement('div');
    const item = `
        <input type='checkbox' class='finished__btn'>
        <p class='content'>${escapeHtml(inputValue)}</p>
        <button class='delete__btn'>X</button>
    `;
    toDoItem.classList.add('toDoItem');
    toDoItem.innerHTML = item;
    toDoBox.appendChild(toDoItem);

    document.querySelector('.inputArea').value = '';
  }
});

// item behavior

toDoBox.addEventListener('click', (e) => {
  // delete function
  if (e.target.classList.contains('finished__btn')) {
    e.target.parentNode.classList.toggle('done');
    return;
  }
  // delete function
  if (e.target.classList.contains('delete__btn')) {
    e.target.parentElement.remove();
  }
});
