### Installing Local Modules

```sh
npm install underscore
```

### Installing Global Modules

```sh
npm install -g coffee-script
```

### Dependency

__package.json__

```json
{
  "name": "My Awesome Node App",
  "version": "1",
  "dependencies": {
    "connect": "2.1.1",
    "underscore": "1.3.3"
  }
}
```

### Semantic Versionin

We want to make sure we are always up-to-date with the most recent __patch-level__ changes to our dependencies when we run `npm install`.

__package.json__

```json
{
  "name": "My Awesome Node App",
  "version": "1",
  "dependencies": {
    "connect": "~2.2.1",
    "underscore": "~1.3.3"
  }
}
```
