## 請列出 React 內建的所有 hook，並大概講解功能是什麼

1. `useState()`==>原本的 functional component 沒有自己的 state，自從 hooks 出來後為了讓 functional component 有自己的 state。有個這個 hooks，functional component 可以有初始值，而這個初始值也不用像 class component 一樣是 object 的格式，可以是 array, oject, number, boolean。要更新的時候再使用第二個回傳的 function `setState()`
2. `useEffect()`==>**render 完之後，瀏覽器 paint 後要做甚麼**，利入像是調用 API 中的資料、儲存到 LocalStorage，都可以在這邊完成，因為有些具有 side effect 的操作可能會影響到 UI。另外，`useEffect()` 可以接受第二個參數，唯一個 array。如果沒有傳 array 進去，也就是預設情況，表示每一次的 render 完之後都會執行;而空的 array 表示只有第一次 render 完後會執行。例如:某些跟 API 調用資料，總不希望每一次 render 後都 call API。如果 array 中有放值，表示該值更新後才會觸發`useEffect()` 的函式
3. `useRef()`==>有些值得改變，如果不須牽涉到重新 render，就可以使用這個 hook。或者比較常見的用法是用於 input 的 focus
4. `useContext()`==>用於傳遞狀態。有時候我們會在最上層定義某些 state 或 function，並在其他 component 可以用。可是因為如果在層層疊疊的關係，沒有`useContext` 就必須要每一層都傳遞一次。使用 `useContext` 則是可以在目標曾就使用父層的 state。使用 Context 的時候要注意，傳入的參數必須要是 createContext 的 那個變數才行。
5. `useCallback()`==>不要讓 function 重新 render。因為在重新的 render 中，會產生一次新的 component 或是 function，但某些 function 不用每一次都重新產生，使用`useCallback()`去記住這些 function 來達到提升效率。
6. `useMemo()`==>一樣也是用於提升效能。因為有時需要執行複雜的邏輯運算後，才 render，如下: 每一次 re-render 都要進行一次 for-loop。

```js
function slowFunction(num) {
  for(let i = 0; i<10000000000; i++) {}
  return num *2
}

function App() {
  const [number, setNumber] = useState(0)
  const doubleNum = slowFunction(number)

  return (
    ...
  )
}
```

7. `useLayoutEffect()`==>跟`useEffect()`的差別在於這是瀏覽器繪出畫面要做的事情

8. `useReducer()`==>`useState()`的代替方案，也適用於管理 state 的 hook。跟`useState()`不同的是更容易管理多個 state。而且跟 state 比請來更接近原生的方式。

## 請列出 class component 的所有 lifecycle 的 method，並大概解釋觸發的時機點

以下的順序就是照著 class component 的 lifecycle 為主，從建立一直到消失

1. `componentDidMount()`==> 當 component mount 到畫面上的時候調用這個函式，如處理 API 調用資料的時候也是在這個階段，但是如果在這個階段有監聽事件的話，就必須在之後將監聽事件移除，避免造成過多的綁定事件。
2. `shouldComponentUpdate()`==> 當資料有更新的時候，我們會去決定是否要更新畫面。如果選擇不更新，那接下來的如果選擇不更新，那接下來的 `componentDidUpdate()` 也不會呼叫。
3. `componentDidUpdate()`==> 指的是重新渲染後，要做甚麼事情，這邊通常會去判斷前後的 state 或是 props 是否相同。
4. `componentWillUnmount()`==> 當 component 要被移除的時候觸發這個函式。例如: navbar 要藏起來的時候就可以使用。

## 請問 class component 與 function component 的差別是什麼？

從 syntax(最表面)來看，class component & functional component 的差別很明顯就可以看得出來，**另外一個不同點在於在 React hooks 推出之前**，functional component 沒有自己的 state，不像 class 可以定義。所以以前 functional component 比較用於 render 沒有 state 的 component。而且也沒有自己的 lifecycle

最大的不同點在於因為 class 中的 `this` 是 mutable 的，所以在使用的時候他會指向最新的值，但是 functional component 因為每一次的 render 都會是新的 function call，傳入的 props 也會這一次 function call 中的 props

```js
class App extends React.component {
  constructor(props) {
    super(props)
    this.state = {...}
  }
  render() {
    ...
  }
}
```

```js
function App(props) {
  ...
}
```

## uncontrolled 跟 controlled component 差在哪邊？要用的時候通常都是如何使用？

controlled component 指的是值是受到 react 控制的，當值改變的時候，會觸發 setValue，把新的值"push"到 state 中，接著 UI 跟著改變。例如我們最常用的 input element。這個好處是當我們想要做 data validation 的時候，可以達成邊輸入邊驗證的效果。

```js
class Form extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
    };
  }

  handleNameChange = (event) => {
    this.setState({ name: event.target.value });
  };

  render() {
    return (
      <div>
        <input
          type="text"
          value={this.state.name}
          onChange={this.handleNameChange}
        />
      </div>
    );
  }
}
```

而 uncontrolled component 則是像是一班我們使用原生的 JavaScript 操作那樣，是沒有受到 React 控制的。一般我們會再加上 `ref` 去獲得輸入的值。如果我們沒有要針對表單做驗證，非常簡單的一個表單，那可以使用 uncontrolled component 即可。但，這麼做似乎也會增加後端的煩惱，因為在前端等於沒有做任何驗證就把資料丟到後端去。
