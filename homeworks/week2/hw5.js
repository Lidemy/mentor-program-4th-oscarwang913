function join(arr, concatStr) {
  let result = arr[0]
  // According to MDN, if the array's length is 0, then the join function returns an empty string
  if (arr.length === 0) return ""
  for (let i = 1; i < arr.length; i++) {
    result += concatStr + arr[i]
  }
  return result
}

function repeat(str, times) {
  let result = ""
  for (let i = 0; i < times; i++) {
    result += str
  }
  return result
}

console.log(join(["aaa", "bb", "c", "dddd"], ',,'));
console.log(repeat('a', 5));
