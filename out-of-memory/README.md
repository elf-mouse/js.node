## 解决内存溢出问题

1. 使用 `process.nextTick()` 防止事件堆积

`process.nextTick()` 会在本次事件循环结束后，立即开始下次事件循环。这样可以使 V8 获得内存回收的机会，有效解决过多事件堆积造成的内存溢出。

2. 增加 V8 内存空间

Node.js 提供了一个程序运行参数 `--max-old-space-size`，可以通过该参数指定 V8 所占用的内存空间，这样可以在一定程度上避免程序内存的溢出。

```js
node --max-old-space-size=4096 app
```

- for `pm2`

```json
{
  "node_args": "--max_old_space_size=4096"
}
```

3. 使用非 V8 内存

Node.js 程序所使用的内存分为两类：

- V8 内存：数组、字符串等 JavaScript 内置对象，运行时使用“V8 内存”
- 系统内存：Buffer 是一个 Node.js 的扩展对象，使用底层的系统内存，不占用 V8 内存空间。与之相关的文件系统 fs 和流 Stream 流操作，都不会占用 V8 内存。

在程序允许的情况下，应该将数据保存在 Buffer 中，而不是转换成字符串等 JS 对象，这样可以避免 V8 内存的过多占用。
