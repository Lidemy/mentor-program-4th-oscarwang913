// For-loop method
function printFactor(n) {
  for (let i = 1; i <= n; i++) {
    if (n % i === 0) {
      console.log(i)
    }
  }
}

// while loop
// function printFactor(n) {
//   let i = 1
//   while (i <= n) {
//     if (n % i === 0) {
//       console.log(i)
//     }
//     i++
//   }
// }

printFactor(10);
