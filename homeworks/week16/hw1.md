**看過自我檢討後有做修改，原本也是寫成setTimeout那邊是直接做console.log()**

``` js
console.log(1)
setTimeout(() => {
  console.log(2)
}, 0)
console.log(3)
setTimeout(() => {
  console.log(4)
}, 0)
console.log(5)
```

![Imgur](https://i.imgur.com/L5xqahH.png)

輸出順序為 `console.log(1)` ==>`console.log(3)` ==>`console.log(5)` ==>`() => {console.log(2)}` ==>`() => {console.log(4)}`

在程式初始化的時候，同步的程式會先被放入 Call Stack 中。所以 1, 3, 5 都會先在 call stack 堆疊。兩個 `setTimeout`一樣會堆疊，但是要執行的動作會先放到另一邊。等到 Call Stack 完全清空後，JavaScript 引擎會再去 task queue 中看是否有要執行的動作。接著依序排入 Call stack 中。
