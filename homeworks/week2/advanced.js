function add(a, b) {
  let num1 = parseInt(a, 10)
  let num2 = parseInt(b, 10)
  return num1 | num2
}

console.log(add(5, 8))