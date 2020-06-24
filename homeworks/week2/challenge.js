function search(arr, n) {
  let min = 0
  let max = arr.length - 1
  while (max > min) {
    let mid = Math.floor((max + min) / 2)
    if (arr[mid] === n) {
      return mid
    } else if (n > arr[mid]) {
      min = mid + 1
    } else {
      max = mid - 1
    }
  }
  return -1
}

console.log(search([1, 3, 10, 14, 39], 14))

