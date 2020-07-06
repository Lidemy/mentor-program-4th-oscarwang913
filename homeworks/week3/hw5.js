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
// ===== Method 1 ====== //
function solve(input) {
  /* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */
  for (let i = 1; i < input.length; i++) {
    const line = input[i].split(' ');
    /* global BigInt */
    const num1 = BigInt(line[0]);
    const num2 = BigInt(line[1]);
    const num3 = Number(line[2]);

    if (num1 === num2) {
      console.log('DRAW');
    }

    if (num3 === 1) {
      if (num1 < num2) {
        console.log('B');
      } else if (num1 > num2) {
        console.log('A');
      }
    }

    if (num3 === -1) {
      if (num1 < num2) {
        console.log('A');
      } else if (num1 > num2) {
        console.log('B');
      }
    }
  }
}

// 輸入結束，開始針對 lines 做處理
rl.on('close', () => {
  solve(lines);
});


// ===== Method 2 ====== //
// function solve(lines) {
//   let totalData = Number(lines[0])
//   for(let i = 1; i <= totalData; i++) {
//     let [a, b, c] = lines[i].split(" ")
//     console.log(comparison(a, b, c))
//   }
//   function comparison(a, b, c) {
//     if(a === b) {
//       return "DRAW"
//     }
//     // exchange
//     if(Number(c) === -1) {
//       let temp = a
//       a = b
//       b = temp
//     }
//     const aLength = a.length
//     const bLength = b.length
//     if(aLength !== bLength) {
//       return aLength > bLength ? "A" : "B"
//     }
//     return a > b ? "A" : "B"
//   }
// }
