### 1. 返回值

根据 Unix 传统，程序执行成功返回 0，否则返回 1 。

```
if (err) {
  process.exit(1);
} else {
  process.exit(0);
}
```

### 2. 重定向

Unix 允许程序之间使用管道重定向数据。

```
ps aux | grep 'node'
```

脚本可以通过监听标准输入的data 事件，获取重定向的数据。

```
process.stdin.resume();
process.stdin.setEncoding('utf8');
process.stdin.on('data', function(data) {
  process.stdout.write(data);
});
```

下面是用法。

```
echo 'foo' | ./hello
```

### 3. 系统信号

操作系统可以向执行中的进程发送信号，process 对象能够监听信号事件。

```
process.on('SIGINT', function () {
  console.log('Got a SIGINT');
  process.exit(0);
});
```

发送信号的方法如下。

```
kill -s SIGINT [process_id]
```
