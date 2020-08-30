## 資料庫欄位型態 VARCHAR 跟 TEXT 的差別是什麼
**以 MySQL 5.0以上版本為基準**
VARCHAR是可以設定資料長度的，通常用於當我們預先知道資料的大小，例如: email, 電話, 姓名等。varchar(20)代表可多以存放20個字，最大的資料為65532 bytes。如果以中文字來算的話，一個中文字大約占掉 3-4 bytes，所以可以存放16383個中文字。這邊要注意的是varchar是否允許Null的，再加上要扣除儲存資料長度的byte (通常是1~2 bytes)，所以最大的資料長度才會是65532 bytes。另外，varchar的型態只有一種。
TEXT型態有四種，從最小的 tinytext 到最大的 longtext。而TEXT 最大的儲存資料大小為 65,535 bytes，不會像varchar要扣除儲存資料長度的byte。TEXT在使用的時候要注意，無法像varchar設定大小。所以比較適合儲存未知大小的資料，如文章。

## Cookie 是什麼？在 HTTP 這一層要怎麼設定 Cookie，瀏覽器又是怎麼把 Cookie 帶去 Server 的？
用手機或電腦瀏覽網站時，常常為在下方看到彈跳視窗顯示 "是否同意使用Cookie?"。Cookie是用來紀錄使用者的一些資料，如 ID 或是 password。等到之後瀏覽相同網站的時候，瀏覽器送出 request 給 server，server 就會知道原來是這個使用者。Cookie 通常存放在瀏覽器中，當收到瀏覽器發過來的 request，伺服器就會傳送一個 Set-Cookie 的 header 跟 response。設置完成後，當request發送出去，就會比對目前瀏覽器中的 Cookie存放區，是否有之前設定的那些 Cookie data。所以就可以做到記住登入狀態的功能。

## 我們本週實作的會員系統，你能夠想到什麼潛在的問題嗎？
Cookie儲存在 Client端，所以當發送請求的時候，攻擊者可以從旁竊聽我們使用的Session ID。例如它在留言版中新增一篇包含 JavaScript的留言，所以當我們登入要留言的時候，我們的 Session ID 就會被竊取。
另外一個是跨站攻擊，如果今天攻擊者用創立一個攻擊的網站，有一天使用者不小心訪問到這個網站，在裡面點選，如果攻擊者將 form 導向你我們的會員系統，它一樣可以竊取我們的資料。