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
  const n = Number(input[0]);
  const arr = [];
  // Push all number from lines into an array
  for (let i = 1; i <= n; i++) {
    arr.push(Number(lines[i]));
  }

  // Determine the number can be divided
  function isPrime(primeNumber) {
    if (primeNumber === 1) return false;
    for (let j = 2; j <= primeNumber - 1; j++) {
      if (n % j === 0) {
        return false;
      }
    }
    return true;
  }

  // Determine the number is prime or not
  /* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */
  for (let i = 0; i < arr.length; i++) {
    if (isPrime(arr[i])) {
      console.log('Prime');
    } else {
      console.log('Composite');
    }
  }
}

// 輸入結束，開始針對 lines 做處理
rl.on('close', () => {
  solve(lines);
});
