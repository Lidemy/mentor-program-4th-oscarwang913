``` js
var a = 1
function fn(){
  console.log(a)//undefined
  var a = 5
  console.log(a)//5
  a++
  var a
  fn2()
  console.log(a)//20
  function fn2(){
    console.log(a)//6
    a = 20
    b = 100
  }
}
fn()
console.log(a)//1
a = 10
console.log(a)//10
console.log(b)//100
```

初始化
1. JavaScript會先產生一個 Global Execution Context。接著在程式逐行執行前，會先把變數與 function 放到記憶體中。所以在這個階段中
第二行會是 `var a = undefined`，因為她只會放入宣告部分，所以 JavaScript 還不知道值是甚麼，就給了 `undefined`。接著第三行看到 function 初始化，也放入記憶體中
![Imgur](https://i.imgur.com/7gHB6Kn.png)

開始執行
2. 目前在 Global Execution Context 第二行變成 `var a = 1`，接著執行第 17 行 `fn()`
![Imgur](https://i.imgur.com/m6YAY6Q.png)
3. 產生 `fn()` 的 Execution Context 並疊加在 Global Execution Context 上
4. 進入 `fn()`，先看是否有變數與 function 宣告，找到有宣告 `a` 變數與 `fn2`
5. 在 `fn()`中，a 一樣會先被賦予 `undefined` 的值，跟著 `fn2()`一起放到記憶體中
6. 所以第四行的 `console.log(a)` 會是 `undefined`
7. 接著 `a` 賦予 5 這個值，第六行的 `console.log(a)` 會是5
8. `a++` 變成 6
9. 第八行的 `var a` 不會有影響，因為他只是要宣告一個 a 的變數
![Imgur](https://i.imgur.com/9x4hSuS.png)
10. 執行 `fn2()`，並產生 `fn2()` 的 Execution Context，疊加在 `fn()` 的 Execution Context 上
11. 進入`fn2()` 的 Execution Context，這邊沒有任何的變數與function的宣告，所以會先執行第 12 行的 `console.log(a)`
12. 因為在 `fn2()` 沒有宣告 a 這個變數，所以他會往上找看與他關聯的 Lexical environment (`fn()`中) 是否有 `a`。結果是有的，所以第 12 行的 `console.log(a)` 為
13. 接著 `a` 被賦予新值 20，`b` 因為在 Lexical environment (`fn()`中) 沒有宣告，在 global 中也沒有，所以會在 global 中產生一個 `b`的值 (100)，但如果是在嚴謹模式下，`b` 就會出現 `Uncaught ReferenceError: b is not defined`
![Imgur](https://i.imgur.com/m6YAY6Q.png)
14. `fn2()` 執行完畢，離開 execution stack
15. `fn2()` 下面的 `console.log(a)`為20
![Imgur](https://i.imgur.com/7gHB6Kn.png)
16. `fn()` 執行完畢，離開 execution stack，現在又回到 Global Execution Context
17. 因為又回到 Global Execution Context，所以第 18 行的 `console.log(a)` 會是 1
18. global 的 `a` 賦予新值 10
19. `console.log(a)` 會是 10
20. 因為剛剛 `b` 在 global 中產生一個宣告，所以 `console.log(b)`會是 100
