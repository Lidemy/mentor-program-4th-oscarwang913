``` js
function isValid(arr) {
  for(var i=0; i<arr.length; i++) {
    if (arr[i] <= 0) return 'invalid'
  }
  for(var i=2; i<arr.length; i++) {
    if (arr[i] !== arr[i-1] + arr[i-2]) return 'invalid'
  }
  return 'valid'
}

isValid([3, 5, 8, 13, 22, 35])
```

## 執行流程

* 這個程式是用來判斷費式數列是否有效

1. 首先，執行第十二行，呼叫isValid，並將 parameter 傳進函式中
2. 執行第二行，進入 isValid 函式
3. 執行第三行，設定變數 i 為 0，檢查 i 是否小於 arr 的長度，如果小於，就跳下一行；反之，如果大於或等於就跳出迴圈
4. 執行第四行，判斷 `arr[0]` 是否小於等於 0，如果是，就回傳 invalid，下面的程式就不會被執行。反之則回到第三行
5. 執行第三行，`i++` 被執行，這個時候 i 等於 1，i 還是小於arr 的長度，所以會執行下一行
6. 執行第四行，判斷 `arr[1]` 是否小於等於 0，如果是，就回傳 invalid，反之則回到第三行
7. 經過 `arr.length` 次判斷後，若都沒有回傳 invalid，就會到第六行
8. 執行第六行，設定變數 i 為 2，並檢查 i 是否小於 arr 的長度
9. 執行第七行，如果 `arr[2]` 不等於前面兩項相加 (`arr[i-1]` + `arr[i-2]`)，回傳 invalid，若相等，跳回第六行
10. 再次執行第六行，`i++` 被執行，這個時候 i 等於 3，i 還是小於arr 的長度，所以會執行下一行
11. 如果迴圈跑完都沒有回傳 invalid，表示整個 array 為 valid。所以執行第十二行
12. 執行完畢
