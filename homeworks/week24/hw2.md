## Redux middleware 是什麼？

Redux middleware 是一個中間件，負責處理 action 被指派之後，要傳到 reducer 之前可以做得事情，如: 當用戶點擊一篇文章標題的時候，呼叫 api 拿到該文章，並跳轉頁面到文章全文。我們可以利用 react thunk 這個 middleware 回傳一個 function，所以我們可以在這邊做 call api 或是其他 logic。如此一來，call api 就不會跟 component 混在一起。

## CSR 跟 SSR 差在哪邊？為什麼我們需要 SSR？

CSR 跟 SSR 都可以呈現相同的畫面，但差別在於如何呈現。當使用 CSR 的時候，打開原始碼會發現內容是空的，因為內容是由 JavaScript 下載完後，render 出來。而 SSR 則是會在後端 render 好，回傳 HTML 給 client。因此可以在原始碼看到完整的 HTML。CSR 衍生出來的問題是當我們要做 SEO 的時候不好做，因為搜尋引擎會無法判別 CSR 的網站內容。另一方面，內容都是由 JavaScript render 出來，所以 JavaScript 的檔案會相對來說較大而造成使用者體驗不佳 (如首頁等很久才跳出)。通常比較好的方式是首頁用 SSR。

## React 提供了哪些原生的方法讓你實作 SSR？

我們可以透過 `renderToString()` 來實作 SSR，可以將要渲染的 component 轉成 HTML 字串。當進入頁面的時候就會回傳這個 HTML。但在這個時候，使用者只看到純 HTML，所以有任何的元素都還沒綁定事件。就要使用 `ReactDOM.hydrate()` 來保留原本元素上綁定的事件。

另外還有

- `renderToStaticMarkup()` 跟前者類似，但常用於靜態是網頁

## 承上，除了原生的方法，有哪些現成的框架或是工具提供了 SSR 的解決方案？至少寫出兩種

- Next.js：基於 React 之下，發展出來的 server-side framework，解決 React 在 SSR 應用的困擾。在這個強大的 framework 下，可以依據 Next.js 的特性輕鬆完成很多事。如檔案架構就是 routing 路徑、甚至在專案中建立 backend server

- Hypernova：Airbnb 開源的 SSR 解決方案，回傳 component 的 HTML。但不會自行處理資料。具體使用要搭配 Ruby on Rails。從這篇[文章](https://itnext.io/strangling-a-monolith-to-micro-frontends-decoupling-presentation-layer-18a33ddf591b)可以大致了解使用的架構
