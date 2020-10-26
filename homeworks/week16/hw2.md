**看過自我檢討後有做修改，原本也是寫成setTimeout那邊是直接做console.log()**

```js
for(var i=0; i<5; i++) {
  console.log('i: ' + i)
  setTimeout(() => {
    console.log(i)
  }, i * 1000)
}
```

![Imgur](https://i.imgur.com/Jx710SF.png)

迴圈開始

`var i=0; i<5;`，進入迴圈。`console.log('i: ' + i)`進入 call stack，並印出 0。`setTimeout(() => {console.log(i)}, i * 1000)`也進入call stack。接著瀏覽器的 time thread 會設置 1 秒之後將 `() => {console.log(i)}` 排入 callback queue 中。

`i++` 後，`var i=1; i<5;`。`console.log('i: ' + i)`進入 call stack，並印出 1。`setTimeout(() => {console.log(i)}, i * 1000)`也進入call stack。接著瀏覽器的 time thread 會設置 1 秒之後將 `() => {console.log(i)}` 排入 callback queue 中。

`i++` 後，`var i=2; i<5;`。`console.log('i: ' + i)`進入 call stack，並印出 2。`setTimeout(() => {console.log(i)}, i * 1000)`也進入call stack。接著瀏覽器的 time thread 會設置 1 秒之後將 `() => {console.log(i)}` 排入 callback queue 中。

`i++` 後，`var i=3; i<5;`。`console.log('i: ' + i)`進入 call stack，並印出 3。`setTimeout(() => {console.log(i)}, i * 1000)`也進入call stack。接著瀏覽器的 time thread 會設置 1 秒之後將 `() => {console.log(i)}` 排入 callback queue 中。

`i++` 後，`var i=4; i<5;`。`console.log('i: ' + i)`進入 call stack，並印出 4。`setTimeout(() => {console.log(i)}, i * 1000)`也進入call stack。接著瀏覽器的 time thread 會設置 1 秒之後將 `() => {console.log(i)}` 排入 callback queue 中。

等到印出 4 之後，call stack 沒有要執行的任務。現在有 5 個 `() => {console.log(i)}` 在 callback queue 中。因為跳出迴圈的時候 i 是 5。所以接下來每一個 `() => {console.log(i)}` 進入 call stack，並執行後都會印出 5。

結果看起來會是 0, 1, 2, 3, 4, 5, 5, 5, 5, 5