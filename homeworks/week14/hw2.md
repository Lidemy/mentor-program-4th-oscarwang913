終於完成佈署自己的網站了，在佈署的時候，真的碰到好多意想不到的問題，所幸最後都有解決。
這次的佈署覺得有些地方還可以再加強:
1. HTTPS 的連線設定
2. Virtual Hosts 實作
3. 佈署整體流程

這次選擇AWS的服務來完成佈署。申請完帳號後，進入自己的 console，會看到非常多的服務，選擇 EC2 的虛擬機來佈署。Amazon 所提供的虛擬機服務，可以讓自己在維護系統上省去不少的時間跟力氣，但很多設定是需要自己調整的。一開始會先選擇主機所在位置，AWS 在世界各地都有主機，所以這邊要看自己的國家比較接近哪個區域，來區別要選擇哪一個 AZ，這邊我先選 N. Virginia (在畫面的右上角可以選擇)
![Imgur](https://i.imgur.com/9vla1p2.png)

第一步，系統選擇 Ubuntu 20.04 LTS版本
![Imgur](https://i.imgur.com/8AFv4xN.png)

第二步，選擇虛擬機的配置
![Imgur](https://i.imgur.com/rkWhvzD.png)

第三步，虛擬機的設定，這邊基本上還不需要去調整設定，所以就跳過了
![Imgur](https://i.imgur.com/yS9G4c0.png)

第四步，調整是否需要增加虛擬機的容量
![Imgur](https://i.imgur.com/yR6S2rH.png)

第五步，新增 tag 目前暫不需要，因為我們只有一個虛擬機
![Imgur](https://i.imgur.com/fJRrGEi.png)

第六步，Security group 設定，這邊要設定開放哪一種方式連線到我們的遠端虛擬機，因為我們要在遠端伺服器架設 web 服務，會選擇像 SSH, HTTP 等可以連線。這邊比較像是防火牆的設定。
![Imgur](https://i.imgur.com/kIs42Yw.png)

第七步，review 自己之前的虛擬機設定，沒問題後，就可以成功在AWS上有自己虛擬機的位置囉!
![Imgur](https://i.imgur.com/3iWo6mQ.png)

距離要把網頁放上去還有一段時間，因為剛剛這些步驟只是讓我有個在 AWS 的虛擬機，還要在上面安裝需要用的伺服器軟體。

首先要先用 Terminal 連線到自己的主機，在剛剛 launch 主機的時候，AWS會提供一組金鑰讓我們能連線。因為只能下載一次，所以要好好保管。

連線成功後，會出現這個 welcome 的頁面，連線方式為 `ssh -i 金鑰 hostname@主機ip位址`
![Imgur](https://i.imgur.com/P77FOnc.png)

我們會用 tasksel 快速安裝 LAMP server，安裝好之後，會看到這個 apache 的頁面。
![Imgur](https://i.imgur.com/9NQTT0k.png)

在安裝 phpmyadmin 的時候，手殘沒有按到 apache2，導致後面要設定的時候都會出錯。如果碰到類似情形，硬再安裝一次是沒有用的，要先反安裝。
`sudo apt-get remove phpmyadmin` 可以移除掉 phpmyadmin 的整個安裝檔
`sudo apt-get purge phpMyAdmin` 則是移除掉相關設定檔

接著就是設定 MySQL 的密碼，這邊可以選擇密碼強度，我當時選擇2，真沒想到強度一定要 100，包含數字、英文、特殊符號，不然不給過。最後就完成了。可以連上遠端 Server 的 phpmyadmin。記得在 security group 那邊還要加上對於 MySQL 的連線。
![Imgur](https://i.imgur.com/EezBAeZ.png)

之後把原本在 local 端的資料庫轉移到遠端 server 上，然後在把之前的做好的一些網頁用 SFTP 上傳。在建立 SFTP 的時候，還是會需要用到剛剛 AWS 給的金鑰。與 SSL 的機制蠻像的，都是在一個有安全的管道下上傳或下載檔案。

上傳好網頁後我才赫然發現我並沒有幫我的 OS 架設防火牆，所以就又趕快研究了一番。UFW，基於 iptable，一個比較簡單易且容易設定的防火牆。有些 port 如果沒有打開的話，就會發生把自己鎖在防火牆外的悲劇。先起用防火牆之後，再針對想開放的連線做設定。這邊我自己覺得是跟剛剛在設定 AWS 的 security group 有點重複？但是想說要擋好擋滿。

接著要測試上傳的網頁，發現其他功能都可以，就是上傳圖片不行。一開始懷疑是自己沒有權限，就去看了資料夾權限，看了之後是有設定好的，接著又看了 code，這邊出現第一個錯誤。本來在 local 端，上傳圖片的功能 `move_uploaded_file()` 會接收兩個參數，一個是暫存的文件名稱，而第二個則是含有上傳的目標路徑的文件名。第二個目標路徑必須要結合 `$_SERVER['DOCUMENT_ROOT']`，這邊會是 `/var/www/html`。改完後，看 log，還是一直顯示 `Warning: move_uploaded_file(): Unable to move 'F:\xammp\xxx\tmp\xxx.tmp' to 'uploads/' in F:\xammp\xammp\htdocs\xxx\main.php on line 47`。查了好久好久，都看不出原因，本來還懷疑會不會是上傳的時候會限制檔案大小。後來才發現原來是我在一開始的時候，沒有把權限設定好。因為寫 PHP 是在 local 端寫，所以在遠端的 OS 上會判別使用者不同，所以沒有權限做這件事情。於是要把權限開啟。然而設定權限也有些規範。在看權限的時候，都會看到一些 `rwx--`這個訊息。研究之後才了解原來每個權限都有類似權重的分數，如: r 是 4，表示可以讀取; w 為 2，表示可以寫入; x 為 1，表示可以執行。所以如果要擁有最高權限的時候，權限分數就是 7 (4 + 2 + 1)。再來就是誰有權限。一般會分 3 種類型，使用者、群體、其他人。如果希望任何人都可以讀寫且執行的話，就要設定 777。這邊關係到 Linux 是個多人多工的系統，詳細可以參考[鳥哥](http://linux.vbird.org/linux_basic/0210filepermission.php)。最後終於可以像在 local 端一樣上傳圖片了。

接著來做 rewrite URL。上網的時候有注意到URL幾乎都不會帶附檔名，像是.php, .html，一方面比較美觀，另一方面對 SEO 優化也有幫助。也有人說隱藏副檔名的用意在於不要讓別人知道你是用甚麼技術撰寫網頁 (但因為現在有wappalyzer 這種 extension，所以應該很難不被人知道)。幾個比較重要的步驟如下

`sudo a2enmod rewrite` 確定有開啟 rewrite 模組

更改apache2.conf 的設定，AllowOverride 要改成 all，這邊改成 all 的原因是在 .htaccess 所有的規則都會被重寫，require 也要改成 all granted，比較像是禁止訪問網站的根目錄的設定
```
<Directory "/var/www/html">
  Options Indexes FollowSymLinks  
  AllowOverride All  
  Require all granted
  RewriteEngine On
</Directory>
```
這邊要注意的是如果是 ubuntu-base的系統是更改 apache2.conf，如果是其他的Linux系統，則是改 httpd.conf，這邊也是我一開始搞不太清楚的
接著要創立一個 .htaccess的檔案，檔名就是 .htaccess，沒有任何副檔名。在這個檔案中就要來撰寫隱藏富檔名的規則
詳細的部分可以參考[這篇](https://medium.com/%E6%B5%A6%E5%B3%B6%E5%A4%AA%E9%83%8E%E7%9A%84%E6%B0%B4%E6%97%8F%E7%BC%B8/htaccess-with-rewrite-3dba066aff11)

於是就完成這次的佈署了，其實就像心得開頭講的，還是有很多地方可以改進。之後再來摸索。其中碰到了很多問題，雖然花了點時間認識跟解決，但走過的會留下痕跡。
