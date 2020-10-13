/* eslint-env jquery */

let initialId = 1;
let totalTodocount = 0;
let incompleteTodocount = 0;

/* eslint-disable */
function encodeHTML(input) {
  return input
    .replace(/\&/g, '&amp;')
    .replace(/\</g, '&lt;')
    .replace(/\>/g, '&gt;')
    .replace(/\"/g, '&quot;')
    .replace(/\'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
}
/* eslint-enable */

// append todo item to the active todo section
function appendTodo(todo) {
  const htmlContent = `
    <div class="d-flex align-items-center w-100 mb-2 p-2 todoItem" data-id="${initialId}">
      <input class="todoItem__checkbox mr-3" type="checkbox">
      <p class="todoItem__content mb-0" data-toggle="modal" data-target="#exampleModalCenter">${encodeHTML(todo)}</p>
      <button class="todoItem__delete_btn btn">Delete</button>
    </div>
  `;
  $('.todos_section__todos--active').append(htmlContent);
  // data-id increment
  initialId += 1;
}

function updateCount() {
  $('.header__para--count--number').text(incompleteTodocount);
}

function updateRate() {
  if (totalTodocount === 0) {
    $('.todo__performance_rate').text(0);
    return;
  }
  $('.todo__performance_rate').text(Math.floor(((totalTodocount - incompleteTodocount) / totalTodocount) * 100));
  const rate = Math.floor(((totalTodocount - incompleteTodocount) / totalTodocount) * 100);
  if (rate >= 75) {
    $('.todo__performance').addClass('high');
    $('.todo__performance').removeClass('mid');
  } else if (rate < 75 && rate >= 40) {
    $('.todo__performance').addClass('mid');
    $('.todo__performance').removeClass('low');
  } else if (rate < 40 && rate >= 0) {
    $('.todo__performance').addClass('low');
    $('.todo__performance').removeClass('mid');
    $('.todo__performance').removeClass('high');
  }
}

$(document).ready(() => {
  // addTodo function
  function addTodo() {
    const inputValue = $('.addtodo_section__input').val();
    if (inputValue) {
      appendTodo(inputValue);
      totalTodocount += 1;
      incompleteTodocount += 1;
      updateCount();
      updateRate();
      $('.addtodo_section__input').val('');
    }
  }

  function retrieveTodos(todos) {
    for (let i = 0; i < todos.length; i += 1) {
      if (todos[i].checkStatus) {
        $('.todos_section__todos--complete').append(
          `
            <div class="d-flex align-items-center w-100 mb-2 p-2 completed todoItem" data-id="${todos[i].id}">
              <input class="todoItem__checkbox mr-3" type="checkbox" checked>
              <p class="todoItem__content mb-0" data-toggle="modal" data-target="#exampleModalCenter">${encodeHTML(todos[i].content)}</p>
              <button class="todoItem__delete_btn btn">Delete</button>
            </div>
          `,
        );
        totalTodocount += 1;
        updateCount();
        updateRate();
      } else {
        $('.todos_section__todos--active').append(
          `
          <div class="d-flex align-items-center w-100 mb-2 p-2 todoItem " data-id="${todos[i].id}">
            <input class="todoItem__checkbox mr-3" type="checkbox">
            <p class="todoItem__content mb-0" data-toggle="modal" data-target="#exampleModalCenter">${encodeHTML(todos[i].content)}</p>
            <button class="todoItem__delete_btn btn">Delete</button>
          </div>
          `,
        );
        totalTodocount += 1;
        incompleteTodocount += 1;
        updateCount();
        updateRate();
      }
    }
  }

  // get the todo id from URL
  const todoId = new URLSearchParams(window.location.search).get('id');
  if (todoId) {
    $.getJSON(`http://localhost/w12/hw2/show_todo.php?id=${todoId}`, (data) => {
      const todos = JSON.parse(data.todos.todo);
      retrieveTodos(todos);
      initialId = todos.length + 1;
    });
  }

  // press enter or button then add todo item
  $('.addtodo_section__btn').click(() => {
    addTodo();
  });

  $('.addtodo_section__input').keypress((e) => {
    if (e.keyCode === 13) {
      addTodo();
    }
  });

  // delete todo
  $('.todos_section').on('click', '.todoItem__delete_btn', (e) => {
    $(e.target).parent().remove();
    totalTodocount -= 1;
    const checkStatus = $(e.target).parent().find('.todoItem__checkbox').is(':checked');
    // if the item is incompleted and deleted, incompleted count --
    if (!checkStatus) {
      incompleteTodocount -= 1;
    }
    updateCount();
    updateRate();
  });

  $('.todos_section').on('change', '.todoItem__checkbox', (e) => {
    const isChecked = $(e.target).is(':checked');
    if (isChecked) {
      $(e.target).parent().addClass('completed');
      $('.todos_section__todos--complete').append($(e.target).parent());
      incompleteTodocount -= 1;
    } else {
      $(e.target).parent().removeClass('completed');
      $('.todos_section__todos--active').append($(e.target).parent());
      incompleteTodocount += 1;
    }
    updateCount();
    updateRate();
  });

  // Edit todo
  $('.todos_section').on('click', '.todoItem__content', (e) => {
    const pretodoContent = $(e.target).text();
    $('.edit_todo_content').val(pretodoContent);
    $('.btn_save').off();
    $('.btn_save').click('click', () => {
      $(e.target).text($('.edit_todo_content').val());
    });
  });

  // clear all completed task
  $('.todos_section__complete_section--clear_btn').click(() => {
    totalTodocount -= $('.completed').length;
    $('.completed').remove();
    updateCount();
    updateRate();
  });

  // switch the tab
  $('.tab_section').on('click', '.tab_section__tab', (e) => {
    if (!$(e.target).hasClass('tab_section__tab--active')) {
      $('.tab_section__tab--active').removeClass('tab_section__tab--active');
      $(e.target).addClass('tab_section__tab--active');
      $('.todos_section').hide();
      $('.todo__performance').removeClass('hide');
    }

    if ($(e.target).hasClass('tasks')) {
      $('.todos_section').show();
      $('.todo__performance').addClass('hide');
    }
  });

  // save todo
  $('.store_btn').click(() => {
    const todoItems = [];
    $('.todoItem').each((i, element) => {
      const checkStatus = $(element).find('.todoItem__checkbox').is(':checked');
      const id = $(element).attr('data-id');
      const content = $(element).find('.todoItem__content').text();
      todoItems.push({
        id,
        checkStatus,
        content,
      });
    });
    const todoData = JSON.stringify(todoItems);
    $.ajax({
      type: 'POST',
      url: 'http://localhost/w12/hw2/add_todo.php',
      data: {
        todo: todoData,
      },
      success: (res) => {
        const resId = res.id;
        /* eslint-disable no-alert */
        alert(`Please add "id=${resId}" after the URL to get your todo list`);
      },
      error: () => {
        console.log('Error!');
      },
    });
  });
});
