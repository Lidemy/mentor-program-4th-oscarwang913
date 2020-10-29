## 這週學了一大堆以前搞不懂的東西，你有變得更懂了嗎？請寫下你的心得。

這週可以算是觀念大補帖，把前面不清楚、不知道為什麼是這樣的補齊。

1. Scope:
```js
function b() {
  console.log(test)
}

function a() {
  var test = 2
  b()
}

var test = 1
a()

```
這段程式碼，可能會覺得因為 a 有宣告一個 `test` ，b 執行後會是印出 2。但結果並不是這樣。因為我們可能會忽略 scope 的觀念。在 global execution context (簡稱 EC) 中有宣告 `test`, `function b`, `function a`。所以他會有個 Lexical Environment，參照到 global。在 function b 執行的時候，在這個 b 裡面沒有 test 這個變數，他就會到他的 Lexical Environment 去找，就是 global EC。果然有找到，結果會是 1


2. Hoisting:
以前對於 hoisting 一職很模糊，提升?把程式碼往上放?在 HW3 實際的練習自己 Hoisting 的觀念。有這個機制的目的在於可以讓 JavaScript 的開發者實現 Mutual recursion，讓 function 再被宣告前就可以被呼叫。[這一篇](http://dmitrysoshnikov.com/notes/note-4-two-words-about-hoisting/)寫得非常清楚。

3. Closure:
```js
function testFunc() {
  var arr = []
  for (var i = 0; i < 3; i++) {
    arr.push(function () {
      console.log(i)
    })
  }
  return arr
}

var test = testFunc()
test[0]()
test[1]()
test[2]()
```
在 Closure 的觀念中用懂這題算是最開心的。這邊有個一開始都會被騙的地方就是迴圈裡的 `console.log(i)`，因為在迴圈的時候其實還沒有真的執行，所以在 array 中是三個 function，而不是印出來的 i。是到最後的時候跳出迴圈。而 i 的最後的值是 3，所以才會三個印出來都是 3。那這邊如果想要印出 0, 1, 2的話，就要將 `var i = 0` 改成 `let i = 0`，因為 let 是會創造自己的一個 block，所以就會依照自己的 block 印出 i 的值。或是可以把程式碼改成
```js
function testFunc() {
  var arr = []
  for (var i = 0; i < 3; i++) {
    let j = i
    console.log(j)
    arr.push(function () {
      console.log(j)
    })
  }
  return arr
}

var test = testFunc()
test[0]()
test[1]()
test[2]()
```
讓多宣告一個一個變數 j，並印出 j 的值。j 是不同的記憶體位址，所以就可以印出 0, 1, 2

4. OOP
物件導向的觀念類似工廠化。給一個藍圖，上產線後製造出跟藍圖相同的東西。這邊我是先從 ES6 開始理解物件導向，畢竟有了 syntactic sugar，語意上會比較好了解，但是還是要記得底層依然是 ES5。

```js
//藍圖
class Coffeemachine {
  //藍圖下設計的基本屬性與方法
  constructor(brand, color, model) {
    this.brand = brand
    this.color = color
    this.model = model
  }
  //這台咖啡機有的一些功能
  ground() {
    console.log('ground it!')
  }
}

let machine1 = new Coffeemachine('xxx', 'yyy', 'zzz')
```
如上面的咖啡機，透過這個建構子就可以建造出咖啡機這個物件。在這個原型中有的研磨功能，建造出來的都有研磨功能，因為研磨的功能是大家都有的，所以不會在各個咖啡機中加入，而是在原型中就會導入。

```js
class Teamachine extends Coffeemachine {
  constructor(brand, color, model) {
    super(brand, color, model)
  }
}
```

如果今天要從咖啡機轉作製茶機，可以用 `extend` 這個方法將咖啡機的屬性與功能都移植到製茶機。這邊有發現如果不在 Teamachine 中加入`constructor`也是可以使用到 Coffeemachine 的屬性及方法。查了一下才了解因為如果 `constructor` 是空的話，JavaScript 會自動幫 `extend` 出去的物件加入一個空的 `constructor` 將原來物件的 `arguments` 導入到這個空的 `constructor`。但如果這樣做的話，當要使用 `this`就會出錯。因為是extend出來的 `class`，`extend` 的 `constructor` 是 derived constructor，他會引響 new 的行為。如果今天是 `extend` 的 `constructor`，他不會 `new` 一個空的 `object` 並將這個 `object` 指向 `this` ***反而是他會叫 parent 的 constructor 做這件事***。所以 如果你今天沒有用 `super`，就沒辦法產生新的 `object` 。也就沒有這個新的物件與 this。這也是為什麼一定要使用 `super` 的原因

5. This
`this` 我覺得是個蠻經典的觀念，之前都是用猜的，想說這次 this 又會指向誰XDD。後來看了老師的文章才發現原來 `this` 指向的東西就會是那個呼叫他的 object。在影片中老師提供的方法真的是蠻好判斷 `this`，將 call function 轉換為 function.call()，然後將 function 前面的物件填入 ()中，就可以知道指向哪一個東西了。

6. Event Loop
JavaScript 是一個 single thread 的語言，所以在處理事件的時候一定是一件一件處理。而Event loop 就是一個機制在形容 JavaScript 處理事件的先後順序。就像是一個餐廳，服務生幫忙點餐是當前的客人處理好才去處理下一個客人，用在 JavaScript 中，像是同步處理。而，服務生與廚房的協作則是類似非同步，因為服務生是把客人點的餐送去廚房後，就繼續點餐，而不是一直在廚房外等待餐點做好。服務生去點餐後，廚房說做好了，他再把餐點送到客人面前。這樣的一個機制就是 Event loop。而 JavaScript 在處理上，一定會等到 Call stack 中沒有事件了，才會將非同步的事件依照順序安排到 Call stack上。這個也是我之前一直想不通的處理順序。看過老師給的影片後，總算知道原來還有這個機制。