## 什麼是 Ajax？
Ajax (Asynchronous JavaScript and XML)是一種 JavaScript 非同步的統稱，其中包含的技術像是 XML、HttpRequest、JavaScript。可以與伺服器做**非同步**的更新。整體的運作是 JavaScript去呼叫 Ajax 引擎，接著 Ajax 會產生一個  XMLHttpRequest 物件。它在非同步處理中扮演非常重要的腳色。它會將 request 送到 server 端處理。等到資料回傳回來之後，再由 Ajax 引擎丟 response 給瀏覽器，瀏覽器再把畫面渲染出來。

## 用 Ajax 與我們用表單送出資料的差別在哪？
承上題，了解 Ajax運作原理之後，再來看與一般送 request 有甚麼差別，如用表單送資料。用一搬方式送出資料，所以使用者要一直等到 request 處理完然後回傳才能繼續動作，在等待的期間，畫面會是沒有東西的。再來說表單送資料，因為表單送出的時候，預設的會將整個畫面重整，可是有時候，我們沒有想要重新跑整個畫面，只需要一部份重新整理就好。所以我們才需要 Ajax來協助我們達成這個目標。

## JSONP 是什麼？
JSONP (JSON with Padding) 是一種存取資料的方式，他可以繞過瀏覽器的 CORS 限制。他的概念其實都在我們使用的時候出現過，就是利用 `<script>` 標籤做跨網域的請求。我們用 JavaScript 產生一個 `<script>` 標籤，將他的來源指向一個跨網域的網址 (如：API網址)。之後 server 會回傳一個 `function`，`function` 的參數就是你要請求的資料結果 (通常為 JSON格式)，最後在 callback function 就可以使用那些我們需要的資料。

## 要如何存取跨網域的 API？
瀏覽器出自於安全性的考量，會對所有的 request 有一個同源政策，表示如果不是在同一個網域下，就會被禁止存取資料。那很奇怪的是，我們跟那些 API 又不在同一個網域，為什麼可以存取? 因為大部分的 API server 都會在 response headers 中加入 "access-control-allow-origin: *"，表示任何來自不同網域的請求皆可發送 request 給 它的 server

## 為什麼我們在第四週時沒碰到跨網域的問題，這週卻碰到了？
第四週的時候，我們是使用 Node.js的執行環境，所以我們是直接送 request 給 server，不會有這些限制。而這週發送 request 的時候，都是透過瀏覽器。如上題所說，瀏覽器基於安全性的考量，所以才會有這些限制。
