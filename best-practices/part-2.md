# Node.js Best Practices - Part 2

## Consistent Style

JSCS is a __code style checker for JavaScript__. Adding JSCS to your project is a piece of cake:

```sh
npm install jscs --save-dev
```

The very next step you have to make is to enable it from the `package.json` file by adding a custom script:

```sh
scripts: {
    "jscs": "jscs index.js"
}
```

Of course, you can add multiple files/directories to check. But why we have just created the custom script inside the `package.json` file? We installed `jscs` as a local dependency only, so we can have multiple versions on the same system. This will work because NPM will put `node_modules/.bin` on the `PATH` while executing.

You can set your validation rules in the `.jscsrc` file, or use a preset. You can find the __available presets__ [here](https://github.com/jscs-dev/node-jscs/tree/master/presets), and can use them with `--preset=[PRESET_NAME]`.

## Enforce JSHint / JSCS Rules

Your build pipeline should contain JSHint and JSCS as well, but it may be a good idea to run __pre-commit checks__ on the developers' computers as well.

To do this easily you can use the `pre-commit` NPM package:

```sh
npm install --save-dev pre-commit
```

and configure it in your `package.json` file:

```json
pre-commit": [
    "jshint",
    "jscs"
],
```

Note, that `pre-commit` will look up what to run in your `package.json`'s script section. By enabling this, these checks will run before every commit.

## JS over JSON for configuration

We see that a lot of project uses JSON files as configuration sources. While this may be a widespread approach, __JS files provide more flexibility__. For this purpose we encourage you to use a `config.js` file:

```js
// config.js

var url = require('url');
var config = module.exports = {};
var redisToGoConfig;

config.server = {
  host: '0.0.0.0',
  port: process.env.PORT || 3000
};

// look, a comment in the config file!
// would be tricky in a JSON ;)
config.redis = {
  host: 'localhost',
  port: 6379,
  options: {

  }
};

if (process.env.REDISTOGO_URL) {
  redisToGoConfig = url.parse(process.env.REDISTOGO_URL);
  config.redis.port = redisToGoConfig.port;
  config.redis.host = redisToGoConfig.hostname;
  config.redis.options.auth_pass = redisToGoConfig.auth.split(':')[1];
}
```

## Use NODE_PATH

Have you ever encountered something like the following?

```js
// server.js

var myModule = require('../../../../lib/myModule');

myModule.doSomething(function (err) {

});
```

When you end up with a quite complex project structure, requiring modules may get messy. To solve this problem you have two options:

- symlinking your modules into the `node_modules` folder
- use `NODE_PATH`

### Setting up NODE_PATH

the following project structure:

```
lib
├─┬ model
│ └── Car.js
├── index.js
└── package.json
```

Instead of using relative paths, we can use `NODE_PATH` which will point to the `lib` folder. In our `package.json`'s start script we can set it and run the application with `npm start`.

```js
// index.js

var Car = require('model/Car');
```

```js
// lib/model/Car.js

console.log('I am a Car!');
```

__package.json__

```json
{
  "name": "node_path",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "NODE_PATH=lib node index.js"
  },
  "author": "",
  "license": "ISC"
}
```

## Dependency Injection

> Dependency injection is a software design pattern in which one or more dependencies (or services) are injected, or passed by reference, into a dependent object.

Dependency injection is really helpful when it comes to testing. __You can easily mock your modules' dependencies using this pattern.__

```js
// index.js

var db = require('db');
// do some init here, or connect
db.init();

var userModel = require('User')({
  db: db
});

userModel.create(function (err, user) {

});
```

```js
// test.js

var test = require('tape');
var userModel = require('User');

test('it creates a user with id', function (t) {
  var user = {
    id: 1
  };
  var fakeDb = {
    query: function (done) {
      done(null, user);
    }
  }

  userModel({
    db: fakeDb
  }).create(function (err, user) {
    t.equal(user.id, 1, 'User id should match');
    t.end();
  })

});
```

```js
// User.js

function userModel (options) {
  var db;

  if (!options.db) {
    throw new Error('Options.db is required');
  }

  db = options.db;

  return {
    create: function (done) {
      db.query('INSERT ...', done);
    }
  }
}

module.exports = userModel;
```

In the example above we have two different `db`s. In the `index.js` file we have the "real" `db` module, while in the second we simply create a fake one. This way we made it really easy to inject fake dependencies into the modules we want to test.
