## 請找出三個課程裡面沒提到的 HTML 標籤並一一說明作用。

1. \<canvas>
這個標籤提供 HTML 有一個類似點陣圖的表面，並可在上面劃一些圖形。但繪畫的時候，必須透過 JavaScript 進行。不僅可以透過這個畫出 2D 圖形，3D 的效果也可以。[範例](https://codepen.io/airen/full/GEaBRW) 讓我驚豔，這樣的圖形是透過 HTML 跟 JavaScript 畫出來的。
目前有些瀏覽器還沒支援這個 tag。所以在使用的時候可以確認自己的瀏覽器是否有支援。

2. \<video>
\<video> 標籤提供我們可以在 HTML 中嵌入影片檔的功能，例如有些網站首頁會播放整頁式的影片，就可以用這個標籤來達成。這個標籤也支援一些方便的 attribute，如：autoplay、controls、lopp等，例如：\<video width="320" height="240" autoplay loop>\<source src="XXX.mp4" /></video> 表示這段影片的長寬為320 * 240，並且循環的自動撥放。

3. \<section>
用來定義HTML文件中一個區域。最常碰到容易混淆的是 \<section> 與 \<article> 的差別，到底要 \<section> 包 \<article> 還是 \<article> 包 \<section>？ 就要看當下的用途。如果是一個部落格頁面，有三個文章，那會用單個 \<section> 去包住三個 \<article>; 如果今天要呈現的是一個文章中有好幾的不同的區塊，分為 introduction、content、summary，就比較適合用一個 \<article> 去包住 三個 \<section>。

## 請問什麼是盒模型（box model）
我們會把所有的 HTML 元素都看成是 box (區塊模型)。每一個區塊模型都會包含自己的 margin、border、padding、以及內容。如果以生活上的例子來說，假如今天去上網去買一個玻璃杯，寄送過來的時候，紙箱外面包著的泡棉就像是 margin，border 就是紙箱本身的厚度，而padding就如同紙箱內放來緩衝撞擊那些粉紅色的泡棉。最後就是玻璃杯 (content)。如下圖的剖面圖
![Imgur](https://i.imgur.com/uvIBauc.png)
在使用的時候，通常會用 box-sizing來決定是要往外加 (content-box)，還是向內扣 (border-box)。

## 請問 display: inline, block 跟 inline-block 的差別是什麼？

1. `display: inline`- 元素一旦被設置為inline，表示其他元素可以跟它共處在同一行 (人緣好)，但是因為 `inline` 人緣太好，所以大家其他元素都喜歡跟他擠在一起，它也無法拒絕 (無法設定margin/padding/height/width)

2. `display: block` - 在這個屬性下，元素會變成區塊元素 (人緣極差)，代表會占滿它所在的那一行。其餘的請到下一行去。像是 `div`、`p` 這些都是屬於區塊元素 (可以設定 margin/padding/height/width)。

3. `display: inline-block`- 結合了 inline & block 的好，人緣好，但也不是濫好人。可以讓其他元素跟他排排站，但是比起要有社交距離的話也是可以 (可以設定 margin/padding/height/width)。

## 請問 position: static, relative, absolute 跟 fixed 的差別是什麼？

1. `position：static` - 這個是每一個元素的預設值，通常不用特別設定。元素照著整個排版流出現在它原本的位置上。

2. `position：relative` - 有設定 `relative` 的元素，會依據元素原本的位置做**相對地**移動，也就是可以使用 top/bottom/right/left 等設定值。而且移動之後，它原本的位置還是會佔據著。

3. `position：absolute` - 它會讓出自己原本的位置，就好像元素浮起來一樣。浮起來之後，它會去找他的上層元素不是static，如果父層沒有設定任何的 position，它就會一直網上找，直到根元素 (HTML)。等依靠在上層後，接著可以使用top/bottom/right/left來定義自己的新位置。因為會讓出原本的位置，所以整個版面會變動，這點要特別注意。

4. `position：fixed` -  顧名思義，會去找到一個定住的位置。元素設定為 `fixed` 之後，讓出原本的位置，並在**可視範圍**內找到屬於自己的位置 (依據設定的 top/bottom/right/left)。例如：將 bottom 設定為 0，表示它會一直待在 viewport 的下緣，不管使用者是否滑動視窗，她都還是在可視範圍的下緣。