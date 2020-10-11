## 什麼是 DNS？Google 有提供的公開的 DNS，對 Google 的好處以及對一般大眾的好處是什麼？
DNS (Domain Name System)用來解析 URL的系統，將 Domain name 轉換成 IP address。後面經過 DNS root name server, .com TLD等之後，最後到最後拿到那個 URL 所對應的 IP address，再傳回給 DNS。所以這個 URL 的 server 收到 request 之後，就會回傳所需的資料。

對一般大眾來說，使用 Gooogle Public DNS 或許可以獲得更快速的網路體驗，因為它在全球遍佈伺服器，但還是要取決於自己所在的地點是否與 8.8.8.8 的這個 DNS 相近。另一方面比較快的原因是他將全球的DNS紀錄都更新到 cache 上，所以不需再遞迴找其他的 DNS 來解析網路。而對 Google，因為使用他的 DNS，她更好去得知用戶上網的行為，進而投放精準的廣告。
## 什麼是資料庫的 lock？為什麼我們需要 lock？
Database lock 是一種機制為了保護資料庫不會在相同的時間內被一個以上的使用者同步修改 (更新或刪除)。例如，台鐵售票系統的資料庫中，大家在中秋節搶票眼明手快的。所以台鐵的 server 會同時收到不同的 request。此時，lock 就派上用場，因為如果今天大家同時搶票，不過座位僅剩的數目遠少於送過來的 request，使用 lock 就可以讓每個 request 都會做完之後，才會讓下一個 request 進行操作。因此不會發生超賣情形。

## NoSQL 跟 SQL 的差別在哪裡？
NoSQL & SQL 都是用來儲存資料的，但運作方式不同。從語言與框架就不太一樣。SQL 採用的技術組合為 LAMP (Linux, Apache, MySQL, PHP); NoSQL 則是 MEAN (MongoDB, Express, Angular, Node.js)。當然不是 100%這樣搭配。差異點如:
* 儲存方式: SQL 以 table 的方式來存資料，而 NoSQL 則是以 document 的方式存入類似 JSON格式的資料。SQL 的 table 非常嚴謹，使用者無法存入不同 row 的資料，但NoSQL 可以。

* SQL 有 schema，等同於一個表格格式與規範，但NoSQL 是schemaless。

* SQL 比較傾向於正規化，也就是每個資料庫都是連棟的。只需更新一個地方，其他地方就會自動更新。但 NoSQL 則是無正規化，指的是在每個 document 中都放入重複的資訊。

## 資料庫的 ACID 是什麼？
ACID 指的是在資料庫中，保證 transaction 的結果是正確且可靠的，而且 transaction 必須遵從這四個原則下，才可以進行變動。假設今天我的 A & B 帳戶要進行轉帳

| account       | $     |
|:-------------:| -----:|
| A             | $1000 |
| B             |  $500 |

* A (Atomicity): A 帳戶轉了 $100 給 B。現在 A 的帳戶是 $900，好巧不巧系統突然 crash。結果 A 的帳戶變成 $900，可是 B 的帳戶依然是 $500，在這樣的情形下。這個操作就會被判定失敗而 roll back。

* C (Consistency)
Consistency 規範transaction 前後的狀態都要是一致的。我認為會造成不一致是因為 atomicity & isolation 被違反了，所以導致前後的狀態不一致。在 Atomicity 的例子中，交易前總金額是 $1500，但交易中失敗，卻變 $1400。這樣就會造成不一致。一致性又分為是 Data 或是 Read 的一致性。
在 Data 的一致性中，如 Youtuber 的追蹤數，之所以都是顯示一個大略的數字，如: 100 萬，因為沒有人真的在乎是 1000015 或是 1000010。這個時候就會造成 data 的不一致性。而 Read 的一致性在於使用者是不是可以在一個 transaction commit 之後，立即看到這個變更。


* I (Isolation)
每一個 transaction 都是獨立的，彼此不應互相影響。我要看我全部的帳戶總共有多少，照理說總共是 $1500。但是今天有人突然從別的帳戶轉錢給我，結果我的 B 帳戶變成 $600，所以最後的結果會是 $1600，而不是一開始的 $1500。這樣就稱為是 dirty-read。

* D (Durability)
Transaction 一旦成立就會一直都在，即使關閉整個資料庫或是系統，重開啟後，資料還是存在。