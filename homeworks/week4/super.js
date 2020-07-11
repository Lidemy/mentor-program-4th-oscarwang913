const https = require('https');

const args = process.argv;
const act = args[2];
const input = args[3];

// 用options的object把各種HTTP method包起來，再個別呼叫
const options = {
  options_list: {
    hostname: 'lidemy-book-store.herokuapp.com',
    port: 443,
    path: '/books?_limit=20',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  },
  options_read: {
    hostname: 'lidemy-book-store.herokuapp.com',
    port: 443,
    path: `/books/${input}`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  },
  options_delete: {
    hostname: 'lidemy-book-store.herokuapp.com',
    port: 443,
    path: `/books/${input}`,
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  },
  options_post: {
    hostname: 'lidemy-book-store.herokuapp.com',
    port: 443,
    path: '/books',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  },
  options_patch: {
    hostname: 'lidemy-book-store.herokuapp.com',
    port: 443,
    path: `/books/${input}`,
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
  },
};

// 列出前20本書的id與書名
function listBooks() {
  const req = https.request(options.options_list, (res) => {
    // 將編碼設置為utf8，表示接收到的data是utf8字串
    res.setEncoding('utf8');

    let str = '';
    res.on('data', (chunk) => {
      str += chunk;
    });

    res.on('end', () => {
      const result = JSON.parse(str);
      result.forEach((element) => {
        console.log(`${element.id} ${element.name}`);
      });
    });
  });

  req.on('error', (e) => {
    console.error(e);
  });
  req.end();
}

// 輸出 id 為...的書籍
function readBooks() {
  const req = https.request(options.options_read, (res) => {
    res.setEncoding('utf8');

    let str = '';
    res.on('data', (chunk) => {
      str += chunk;
    });
    res.on('end', () => {
      const result = JSON.parse(str);
      console.log(`${result.id} ${result.name}`);
    });
  });

  req.on('error', (e) => {
    console.error(e);
  });
  req.end();
}

// 刪除id為..的書籍
function deleteBooks() {
  const req = https.request(options.options_delete, (res) => {
    res.setEncoding('utf8');
    res.on('end', () => {
      console.log(`刪除id為${input}的書籍`);
    });
  });
  req.on('error', (e) => {
    console.error(e);
  });
  req.end();
}

// 新增一本書
function createBooks(name) {
  const req = https.request(options.options_post, (res) => {
    res.setEncoding('utf8');
    let str = '';
    res.on('data', (chunk) => {
      str += chunk;
    });
    res.on('end', () => {
      console.log(str);
    });
  });

  req.on('error', (e) => {
    console.error(e);
  });

  req.write(JSON.stringify({ name }));
  req.end();
}

// 更新書籍名稱
function updateBooks(name) {
  const req = https.request(options.options_patch, (res) => {
    res.setEncoding('utf8');

    let str = '';
    res.on('data', (chunk) => {
      str += chunk;
    });
    res.on('end', () => {
      console.log(str);
    });
  });

  req.on('error', (e) => {
    console.error(e);
  });

  req.write(JSON.stringify({ name }));
  req.end();
}

// different action by different act
switch (act) {
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
    createBooks(input);
    break;
  case 'update':
    updateBooks(args[4]);
    break;
  default:
    console.log('請使用list, read, delete, create, update等關鍵字喔');
    break;
}
