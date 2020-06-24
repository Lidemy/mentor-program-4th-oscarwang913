// For-loop method
function reverse(str) {
  let result = ""
  for (let i = str.length - 1; i >= 0; i--) {
    result += str[i]
  }
  console.log(result)
}

// while loop method
// function reverse(str) {
//   let result = ""
//   let i = str.length - 1
//   while (i >= 0) {
//     result += str[i]
//     i--
//   }
//   console.log(result)
// }
reverse('hello');
