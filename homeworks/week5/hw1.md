## 前四週心得與解題心得

時間過得非常快，第一個月的課程馬上就要結束了，回想起當初寫報名信的時候，還很擔心自己會不會沒有被 Huli 選上。還好我應該是有神聖計畫徽章的，才能幸運地變成被選召的孩子。如果用一個字來形容這四週的感想，那想必是 **Wonderful！** 或是 **Awesome！**。我覺得可以用超級瑪利歐來講這四週的故事。

![alt text](https://i.ytimg.com/vi/f6IjbeK2MhI/maxresdefault.jpg)

### 第一週

![alt text](https://i.imgur.com/gP0Sh93.png)
在第一關中，碰到了自稱 CLI 的香菇妖怪，雖然不會不好打，但就也是要小心別被CLI給傷到。這邊學了蠻多 CLI 指令的用法，包含怎麼用 CLI 做出一個簡單的小程式，可以快速產生 10 個 JavaScript 的檔案、其中有用到像是 grep、pipe、awk 等指令。這一周也有學如何使用 Regex 語法。接下來最重要的是 Git 的使用。好多指令可以使用，像是：`git add`、`git commit`、`git branch` 光是上傳作業就搞得我一個頭兩個大，特別是那次不小心把跟 Huli 的 Repo 一起上傳到作業，整個差點失眠 :laughing:
還有 origin master 跟 origin/master 的差別是甚麼，哪一個是要 `git push` 到遠端用的，哪一個又是 `git fetch` 的時候會用到，這些都要清清楚楚。

![alt text](https://i.imgur.com/AUaEgY0.png)
經由這樣的訓練後，總算通過第一關(汗。

### 第二週

![alt text](https://i.imgur.com/Ere1pSx.png)
第二週，JavaScript 就像圖片中炙熱的火球一樣，每次在解題的時候都覺得媽的，怎麼野火燒不盡，春風吹又生。有先題目就是奇怪怎麼想也想不出來怎麼解，然後又會跑出一些意想不到的結果。Syntax error、runtime error。有時還會懷疑自己是不是基礎沒打好。For-loop、if-else、function等，真的都要一練在練。我覺得 Huli 的教學讓我很印象深刻的是會限制我們在一開始使用 built-in function，因為如果一開始就用的話，很多東西看起來像是自然而然的發生，但我們卻不會知道背後運作原理是甚麼。程式是一行一行地跑，日子是一天一天地過。What is the difference between `console.log` and `return`？ 這個真的也是重複看影片，看了又看。剛開始碰到的時候，想說不是都一樣嗎？。另外還有一個，pass by value or reference or sharing，這個除非自己寫一小段 code 實際跑過，觀察其中的差異，不然真的很難去體會箇中奧妙阿！Immutable 是怎麼一回事？這裡我覺得搭配 Huli 的課外文章，去博物館的還有另外一篇專門是探討 pass by value or reference 來看講得十分詳細。每一個值都會有自己的記憶體位址。就像是去博物館放包包一樣。

![alt text](https://i.imgur.com/JwQyUNJ.png)
第二週在完成加法器之後，應該算是過關了。

### 第三週

![alt text](https://i.imgur.com/fqVcwdf.png)
ES6就像是花朵一樣，讓馬力歐吃了可以發射火球。很多以前要寫比較多字的語法，經過 ES6 之後變得簡潔有力。我覺得好用的還是 ternary condition operator。一行解決之前寫好多行的 `if-else` 語法。 `let result = (beat all monster) ? "Yes" : "No"` 或是像是展開運算三個點點。這邊也學到一個很重要的觀念。一定要用清楚資料範圍，像是 Huli 所講的，如果出去不管是面試還是工作，如果別人沒有給輸入範圍，就要問清楚，因為這關係到程式跑出來的結果。像是聯誼順序比大小的作業，一開始就沒有用清楚資料範圍，結果即使把輸入值轉成 Number 也不會通過測資。之後解題都會特別去看輸入範圍是甚麼。這一週還也學一個也是蠻重要的東西，寫測試。以前寫 code，要測試自己寫的是否正確都要一個一個印出來。但用 Jest 寫測試的話，不僅可以量化測試範圍，也可以一目了然的知道自己哪裡寫錯，甚至用 TDD 的方式，先寫測試，在寫程式。這是今天寫來測試LIOJ - 1005的XD

```JavaScript
const isAmicable = require('./1005');

describe("Test the isAmicable function", () => {
  test('Testing the number is amicable number or not', () => {
    expect(isAmicable(284)).toBe(220);
  });

  test('Testing the number is amicable number or not', () => {
    expect(isAmicable(1184)).toBe(1210);
  });

  test('Testing the number is amicable number or not', () => {
    expect(isAmicable(6232)).toBe(6368);
  });

  test('Testing the number is amicable number or not', () => {
    expect(isAmicable(63020)).toBe(76084);
  });

  test('Testing the number is amicable number or not', () => {
    expect(isAmicable(12285)).toBe(14595);
  });

  test('Testing the number is amicable number or not', () => {
    expect(isAmicable(221)).toBe("QQ");
  });
})
```

![alt text](https://i.imgur.com/6T1n4Mk.png)
雖然要走的路還很漫長，但是至少在這一周要確定自己不在像之前那樣看到題目就退縮、然後在螢幕前面搞好久也想不出來怎麼寫。喔對！還有另外一件事，Eslint，檢查錯誤。一開始噴出 100 多個錯誤，真的會懷疑人生。想說這要修到何時。但之後自己取查資料，問助教之後，發現其實修錯誤還挺好玩的，一行一行看，順便也檢視自己寫的 code 是不是還有改進的地方。我那時候還跟朋友說诶诶，修一修會上癮诶，他一臉狐疑:frowning:

### 第四週

![alt text](https://i.imgur.com/HdJ9s0n.png)
網路基礎概論是很重要的一週，怎麼說呢？這關係到瞭不了解前後端的溝通，例如像是傳紙條訂便當的故事，中間會經過三次握手，確認雙方都有收到彼此訊息。紙條上面的內容包含 header 與 body。但訊息不僅是要傳送的出去，是要成功傳送與成功接收。這個時候就會有 HTTP status code 來幫助我們判斷現在是甚麼情形。

![alt text](https://i.imgur.com/mEeRtoh.png)

![alt text](https://i.imgur.com/gAihI7X.png)

像是上面兩張圖就是可以很清楚地從Response headers 跟 Request headers 看到一些資訊，包含是用甚麼瀏覽器，這個關係到有些軟體服務業者可以從中判斷是要開給使用者 Mac 的下載頁面還是 Windows 的下載頁面、還可以看到內容是甚麼形式，是 HTML、JSON、還是其他的格式。還有一個很重要的是用甚麼 HTTP methods。

實作方面，HTTP Challenge 真的幫助很大，把這一週學到的觀念全部用上都還不夠，有些都還要另外查。不過，很開心可以學到更多東西。

這一周還有一個蠻重要的東西是Node，第三、四週可以是串聯在一起的，因為要學會怎麼使用 node 跟 npm 或是 yarn，第四週才能進行。另外也練習用 node 寫出一個簡單的 server，可是讀到不同的網頁。這邊就會用到像 `fs`、`__dirname`、` __filename ` 等，也是蠻有趣的練習！

![alt text](https://i.imgur.com/weH6KrP.png)
很高興加入這個 program，可以跟這麼多厲害的人一起學習，另外還有助教群跟 Huli。非常感謝大家，之後還要一起努力。路還很長，我還差地遠！