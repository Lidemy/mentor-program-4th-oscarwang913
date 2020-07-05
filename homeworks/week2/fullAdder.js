function fullAdder(a, b) {
  debugger
  // sum doesn't care about the carry
  let sum = a ^ b
  // take care the carry here. Remember 1 + 1 = 10 (bitwise operator)
  let carry = (a & b) << 1
  if (!carry) {
    return sum
  }
  return fullAdder(sum, carry)
}

console.log(fullAdder(80, 20))
console.log(fullAdder(100, 20))
console.log(fullAdder(5, 2))