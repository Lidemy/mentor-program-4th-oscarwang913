## Webpack 是做什麼用的？可以不用它嗎？
在過去的 JavaScript 並沒有模組化或是重複使用的概念，因為以前都是以小規模居多，code 幾乎都是東一塊西一塊。但隨著開發的規模壯大，發現在無模組化下開發很困難，耗時、耗力。所幸有 Webpack 的誕生，就是為了要讓 code 模組化，達到分離、重複使用的目的。一方面也不會再讓變數發生 conflict，另一方面，模組化後打包成一個進入點也讓開發時，不知道該哪個進入點是第一順位的問題解決了。可不可以不使用 webpack我覺得主要還是看專案，如果只是要打包 JavaScript，那使用 webpack 有點殺雞用牛刀的感覺，可以改用類似 rollup；如果是大型專案，如 web app，那 webpack 會是好選擇。

## gulp 跟 webpack 有什麼不一樣？
gulp 的核心概念在於**前端開發的流程管理**，實現前後端分離、文件合併及壓縮。gulp 就像是一個產品的開發流程，產品從無到有都受到 gulp 的控制。他將每一個要做的事情都當作是一個 task，分批進行或是一起進行。例如，先把 JavaScript ES6 轉成 ES5，下一個 task 則是 scss 轉換成 css。而 Webpack 的核心在於**將前端的資源模組化**，任何的資源都可以看成是一個模組，將許多模組依照相互的依賴性整合成前端的資源。各個資源可以再經由 loader 不同的轉換，並適合應用在大型的 SPA 開發。

## CSS Selector 權重的計算方式為何？
在 CSS 中，權重值計算分為三個等級
* ID selector
* class selectors, attributes selectors, and pseudo-classes
* type selectors and pseudo-elements
* universal selectors
權重又是以 (ID, class, element) 來計算。也就是說當今天某個元素標示為 `.container` 他的權重為 (0, 1, 0)，如果是 `div.container`，那全種就是(0, 1, 1)，所以在套用屬性的時候 `div.container` 的屬性會蓋過 `.container`的屬性。如果權重一樣，前面的會被後面宣告的覆蓋。另外，當在行內宣告屬性，行內的屬性值會覆蓋以上由 ID, class, element 所宣告的屬性。最後一個則是 `!important`，這是最厲害的宣告方式，直接忽視其他規則，瀏覽器渲染時會直接渲染有加上 `!important` 的屬性值。
