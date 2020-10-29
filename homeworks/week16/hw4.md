``` js
const obj = {
  value: 1,
  hello: function() {
    console.log(this.value)
  },
  inner: {
    value: 2,
    hello: function() {
      console.log(this.value)
    }
  }
}
  
const obj2 = obj.inner
const hello = obj.inner.hello
obj.inner.hello() // ??
obj2.hello() // ??
hello() // ??
```

1. `obj.inner.hello()`: 這個 `this.value` 會是 2。因為他會指向呼叫的 `object`，在 `inner` 這個 `object` 中的 `value` 是 2，所以執行 `hello()` 的時候，`value` 就會是 2。

2. 與第一個是一樣的，參照到 `inner` 這個 `object`，所以 `this` 就會指向 `inner`。value 會是 2

3. 這邊 `const hello = obj.inner.hello` 等同於 `const hello = function() {console.log(this.value)}` 所以執行 `hello()` 因為是一個自己的 EC，`this.value`會是 `undefined`
