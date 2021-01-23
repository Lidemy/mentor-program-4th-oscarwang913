## 為什麼我們需要 Redux？

在大型的應用中，通常有許多的 component 會使用到同一個 state，所以在 state 溝通及互相調用上會變得非常麻煩。而 Redux 就是為了解決這個問題而誕生的 library。可以把共同會使用的 state 放到 store 中，所以當有任何一個 component 需要使用到這個 global state，就可以對它進行修改、調用。所以其他的 component 也會非常輕鬆拿到最新的 state，另一方面，也不需要層層地傳遞 state。

## Redux 是什麼？可以簡介一下 Redux 的各個元件跟資料流嗎？

可以把資料流的流程理解為圖書館中借書的流程
![Imgur](https://i.imgur.com/FGSXqe1.png)

React component 當作是借書的人，當他說我要借書的時候，action 就是借書這個動作。而 store (圖書館管理員) 接收到這個借書者說要借書，所以他就會去 reducer (紀錄本) 查詢並拿到書的資訊，再傳回給 React component (借書者)。而當借書書拿到的書的時候，舊更新自己的狀態為拿到一本 XXX 書 (更新畫面)。整個資料流會是單向的。這樣的好處在於更容易管理 state，也就是知道改變 state 的源頭是誰，在維護跟 debug 上容易許多。

## 該怎麼把 React 跟 Redux 串起來？

在 hooks 還沒推出以前，可以使用 `connect` 將 react component 跟 store 中的 state 做連接。也就是把 store 中的 state 當作是 component 的 props 傳入進該 component。而第二個參數為 mapDispatchToProps，也就是把 store 中的 dispatch 方法 當作是 props 傳入到 component。就可以在 component 中使用。

```js
export default connect(mapStateToProps, mapDispatchToProps)(React component)
```

而當 hooks 出來的時候，就可以使用 `useSelector()`、`useDispatch()`。Selector 是用來選擇到對應的 state 選出，而 `useDispatch()` 則是會直接回傳一個 dispatch 的 function。並在事件出發的地方放上這個 function，進行 reducer 觸發。
