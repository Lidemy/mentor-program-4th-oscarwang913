## 十六到二十週心得

Week16 - 觀念改造
這一週學了蠻多 JavaScript 底層觀念，老師也不斷強調這些都是有助於在日後解決問題上，開發者可以很快釐清問題所在，並提出適當的 solution。當然很重要的其中一點，也是面試必問。

- Hoisting - 搞懂為什麼可以使用變數、`function` 在宣告以前，這樣的機制對我們在開發上有甚麼幫助。

- Closure - 在一個 `function` 中回傳一個 `function`。甚麼意思呢? 可以解釋為為什麼當一個 `function` 結束後他的值還是會被保留在自己的作用域中。我覺得一個蠻真實的例子是老師在 closure 最後提的錢包，closure 可以限制"更改"的自由性。我們只能從外部傳入值，必無法直接從外部更改值。所以我們只能從 function 內部做變更。或是按讚的功能也是一種 closure 觀念的應用。一開始讚的次數一定是 0，而且不能放在全域。因為有可能會被修改到，要放在 `function` 中。但如果要實現在外部也能改變這個在 `function` 內的變數，就要依靠 closure 的機制。

- Event loop - 這個就是講道事件觸發的機制。JavaScript 雖然是個 single-thread 的語言，但卻可以又處理主要事件和 call API 好像是背景作業那樣執行，主要靠著 Event loop 這個機制達到這個成果。他就像是個中間協調者去協調事件處理的順序。主要的 stack 完成、清空後，再去看是不是有一些"背景作業"要等著執行，如果有，從背景那邊拉到主要執行堆中。

- this - 現在在 React 中的我很有感，特別是在 Class component，真的要搞清楚這個 this 指向的是誰，還是那句話 **跟怎麼呼叫有關，跟在哪被創立較無直接關係**

Week 17 & 18 - 暫時跳過

Week 19 - 從技術走向產品開發的大方向。我覺得像是跳到宏觀的角度去看待產品 & 開發的相互關係。我覺得如果有第五期的課程，可以建議從老師講述他一週的工作過程開始看起。再去從實際開發的流程中去了解甚麼事敏捷式開發，對產品開發帶來哪些好處、或是這個方法論可能會延生的問題有那些。再跟 Waterfall 做比較。如: Agile 講求的是隨時可接受改變，但可能衍生的問題式開發時間拉長或式產出跟預期有些許落差?

Week 20 - Yakim 助教提供的優化挑戰十分有趣，看 Udacity 的課程有蠻大的體悟。一開始一看到那個優化的練習。馬上就開始優化，壓縮、刪掉 comments、圖片優化樣樣來。可是我忽略了一點。哪些要壓縮? 怎麼做? 等於沒有定義好 What & How。後來就整個重來一次。從 Chrome 的 lighthouse 或是一些優化分析網站上看數據:

優化前的數據

![Imgur](https://i.imgur.com/Xla1iyB.png)

1. 刪除非必要字元
   HTML: 如註解、出師表、長恨歌等。註解是在開發時可以幫助其他人了解，但真正上線的時候，瀏覽器看不懂這些東西，所以可以刪除 (25KB->18KB)
   JavaScript: 刪除註解 (15KB->12KB)
2. 刪除多餘的資源
   如: Vue, Angular, material-icons.css
3. 縮小 bootstap 的大小，使用 minify 過的
   CSS (188KB->153KB)
   JavaScript (129KB->57KB)

成果: 內容 loading 時間跟文件完成時間大概縮短 1 秒
![Imgur](https://i.imgur.com/Fld95Na.png)

第二階段的主要是開始針對內容的優化

1. 首先是圖檔，轉換成 webP 格式，這一塊就很在 loading 頁面的時候就有很明顯的差異

2. 針對 HTML, JavaScript, CSS 進行壓縮。運用 gulp 的一些套件，像是 clean-css for CSS, htmlmin for HTML, uglify for JavaScript。

![Imgur](https://i.imgur.com/CSX3BXw.png)

認為可以做好的地方，再回去看 Yakim 助教的超強優化跟同學的比較後。應該算是做得不完整，之後假日找時間在優化一次

1. lazy-loading
2. 延遲載入（defer）
3. 調整圖片尺寸
4. 快取
5. CSS sprite
