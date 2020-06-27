// The first method
function capitalize(str) {
  let newStr = ""
  if (str.charCodeAt(0) >= 97 && str.charCodeAt(0) <= 122) {
    newStr += str[0].toUpperCase() + str.slice(1)
  } else {
    return str
  }
  return newStr
}


// The second method
// function capitalize(str) {
//   return str[0].toUpperCase() + str.slice(1)
// }

console.log(capitalize(",ick"))