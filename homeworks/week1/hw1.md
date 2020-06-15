## 交作業流程

### :green_book: 怎麼寫作業

寫作業前，必須在本地端先建立一個 branch ( `git branch week1` )。之後就可以開始寫作業了。在完成後，記得要將作業加入到 Staging Area (`git add .`)，如果有任何更動，並加入自己的 commit (`git commit -m`)。

### :green_book: 交作業

**交作業的方式是將一整個禮拜的作業一次寫完在上傳**

完成這個禮拜作業後，將本地端的 branch 推上GitHub (`git push origin week1`)。之後在 GitHub 中發送新的 Pull requests。如果在 Pull requests 的頁面中沒有看到 compare and pull request 的按鍵，也可點選  new pull request。之後到 [學習系統](https://learning.lidemy.com/) 中新增作業，將 pull request 連結貼上，這邊要注意**交作業前都要先看過自我檢討**。之後才能將作業送出

### :green_book: 教完作業後

等到助教批改完畢後，助教會將在 GitHub 上的 branch 整合到 master。我們將在 GitHub 上整合好的 master 下載到本地端 (`git pull origin master`)，如此一來，本地端跟 GitHub 上的進度就會是同步的。最後就可以將本地端的 branch 刪除 (`git branch -d week1`)