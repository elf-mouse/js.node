## Printing objects on Node.js

Problem: If a data structure is too deeply nested, Node.js stops showing the details. This post presents two solutions.

### Display a value as JSON data

Node.js stops displaying a data structure after two levels of nesting:

```sh
> [[[ "test" ]]]
[ [ [ 'test' ] ] ]

> [[[[ "test" ]]]]
[ [ [ [Object] ] ] ]
```

In this case [Object] stands for [ "test" ].

__Option 1:__ a single line of JSON.

```sh
> console.log("%j", [[[[ "test" ]]]]);
[[[["test"]]]]
```

__Option 2:__ Use `JSON.stringify()` to print an indented tree.

```sh
var tree = function(x) { console.log(JSON.stringify(x, null, 4)) };
> tree([[[[ "test" ]]]]);
[
    [
        [
            [
                "test"
            ]
        ]
    ]
]
```

> Warning: Anything non-JSONy will not be printed.

```sh
> console.log("%j", { foo: function() {}, bar: "abc" })
{"bar":"abc"}
```

### Use `util.inspect()`

You can also use [util.inspect()](http://nodejs.org/docs/latest/api/util.html#util.inspect), but you need to specify that the nesting depth should be unlimited (the default is 2). It is also better not to show non-enumerable properties to avoid recursing into the properties of a function.

__Option 1:__ Use `util.inspect()` directly.

```sh
var util = require("util");
> function ins(value) { console.log(util.inspect(value, false, null)); }

> ins([[[[ "test" ]]]])
[ [ [ [ 'test' ] ] ] ]

> ins({ foo: function() {}, bar: "abc" });
{ foo: [Function], bar: 'abc' }
```

__Option 2:__ Use `console.dir()`, which internally calls `util.inspect()`. Drawback: Stops after a nesting depth of 2.

```sh
> console.dir([[[[ "test" ]]]])
[ [ [ [Object] ] ] ]

> console.dir({ foo: function() {}, bar: "abc" });
{ foo: [Function], bar: 'abc' }
```
