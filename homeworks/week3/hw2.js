const readline = require('readline');

const lines = [];
const rl = readline.createInterface({
  input: process.stdin,
});

// 讀取到一行，先把這一行加進去 lines 陣列，最後再一起處理
rl.on('line', (line) => {
  lines.push(line);
});

// 上面都不用管，只需要完成這個 function 就好，可以透過 lines[i] 拿取內容
function solve(input) {
  const line = input[0].split('');
  const n = Number(line[0]);
  const m = Number(line[1]);

  function isnarcNum(i) {
    const str = i.toString();
    let num = 0;
    /* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */
    for (let j = 0; j < str.length; j++) {
      num += Number(str[j]) ** Number(str.length);
    }
    return num;
  }

  for (let i = n; i <= m; i++) {
    // determine the number is Narcissistic number or not
    if (i === isnarcNum(i)) {
      console.log(i);
    }
  }
}

// 輸入結束，開始針對 lines 做處理
rl.on('close', () => {
  solve(lines);
});
