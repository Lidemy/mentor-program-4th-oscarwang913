## 這週這種後端負責提供只輸出資料的 API，前端一律都用 Ajax 串接的寫法，跟之前透過 PHP 直接輸出內容的留言板有什麼不同？
**題目的順序我有做改變**
在前一週的時候，我們透過 PHP 在後端拿到資料後，直接在前端選染出來。所以當有多少頁面的時候，就會渲染幾次。不管內容是否相同，負責的範圍很廣，拿資料、資料處理、渲染基本上都是在同一個地方完成。而這週以 API 的方式就有很大的差別。後端只負責資料的部分，傳送過來的也只有純資料，至於渲染及資料處理的部分則是由前端來負責。所以就達成前後端分離的里程碑了。

## 請簡單解釋什麼是 Single Page Application
呈上，因為前後端分開之後，渲染就成為前端的管轄範圍。我們的網頁通常不會只有一個頁面。但如果要每一個頁面都渲染一次有點太耗時、耗力。所以這個時候就有了 SPA。宗旨是頁面一樣，但功能不一樣。就像 Gamil，當我在首頁的時候，網址會最後會是 "\#inbox"，但當我跳到計件備份的時候，只有後面的 hash 的部分改成 "\#sent"。基本上畫面大致不改變，只會改我們需要的部分，所以整個畫面會比 MPA 來的更流暢。

## SPA 的優缺點為何
* 優點
1. 讀取速度，因為不同於 MPA需要把每個頁面都載入一次，SPA只需更新需要的部分，所以在網頁的 loading 速度上會快很多。
2. UX，使用者不用一直跳轉頁面，即可完成大部分的事情。
3. 使用較少的頻寬資源，因為跟後端的溝通變成是由 API 來溝通，所以不會像一班網頁要從 server 載入一整頁 HTML。
* 缺點
1. SEO，從後端提供的 API 中抓資料，再用 JavaScript 動態渲染出來，所以當查看 response 的 HTML 檔的時候，會發現沒有內容，相對於要做搜尋引擎優化比較不利。
2. 第一個頁面讀取慢，因為要用 JavaScript動態渲染出大部分的資料，所以在第一個頁面的時候，渲染時間會比較久。