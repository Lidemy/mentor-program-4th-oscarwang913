const request = require('request');
const process = require('process');

// 產生args
const args = process.argv;
const argsBox = [];
for (let i = 2; i <= 4; i++) {
  argsBox.push(args[i]);
}
// 這次要用的API
const apiUrl = 'https://lidemy-book-store.herokuapp.com/books';

// List 20 books
function listBooks() {
  request(`${apiUrl}?_limit=20`, (err, res, body) => {
    if (err) {
      console.log('抓取失敗', err);
      return;
    }

    let data;

    try {
      data = JSON.parse(body);
    } catch (error) {
      console.log(error);
      return;
    }
    /* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */
    for (let i = 0; i < data.length; i++) {
      console.log(`${data[i].id} ${data[i].name}`);
    }
  });
}

// Ouput the book related to the parameter
function readBooks() {
  request(`${apiUrl}/${argsBox[1]}`, (err, res, body) => {
    if (err) {
      console.log('抓取失敗', err);
      return;
    }

    let data;

    try {
      data = JSON.parse(body);
    } catch (error) {
      console.log(error);
      return;
    }

    console.log(`id為${argsBox[1]}的書籍為: ${data.name}`);
  });
}

// delete a book
function deleteBooks() {
  request.delete(`${apiUrl}/${argsBox[1]}`, (err) => {
    if (err) {
      // return console.log 出現在error的地方，表示如果出錯，下面的code不再繼續執行
      console.log('刪除出錯!');
      return;
    }
    console.log(`刪除id為${argsBox[1]}的書籍`);
  });
}

// Create and Patch共同的callBack
function callBack(err, res, body) {
  if (err) {
    console.log('新增出錯!');
    return;
  }

  let data;

  try {
    data = JSON.parse(body);
  } catch (error) {
    console.log(error);
    return;
  }

  console.log(data);
}

// create a book
function createBooks(input, callback) {
  request.post(
    {
      url: `${apiUrl}`,
      form: {
        name: input,
      },
    },
    callback,
  );
}

// update a book
function updateBooks(id, name, callback) {
  request.patch(
    {
      url: `${apiUrl}/${id}`,
      form: { name: `${name}` },
    },
    callback,
  );
}

switch (argsBox[0]) {
  case 'list':
    listBooks();
    break;
  case 'read':
    readBooks();
    break;
  case 'delete':
    deleteBooks();
    break;
  case 'create':
    createBooks(argsBox[1], callBack);
    break;
  case 'update':
    updateBooks(argsBox[1], argsBox[2], callBack);
    break;
  default:
    console.log('請使用list, read, delete, create, update等關鍵字喔');
    break;
}
