# Log Objects with template literal syntax

install

```sh
    npm install log-object
```

## USAGE

```js
const {Log} = require("log-object");

const myobj = {
  name: "John",
  surname: "Doe",
};

Log.obj(myobj, "Hello my name is ${name} and my surname is {surname}");
```

which outputs =>

```sh
    Hello my name is John and surname is Doe
```

## Parameters

| Parameter | Type   |
| --------- | ------ |
| First     | object |
| Second    | string |

## Syntax

In template strings =>

```js
console.log(
  `Hello my name is ${myobj.name} and my surname is ${myobj.surname}`
);
```

With Log Object Support =>

```js
Log.obj(myobj, "Hello my name is ${name} and surname is ${surname}");
```

## Thats it.

# Will Come in future

- More methots with array and other types support

- Better syntax

- VS code auto completion extension

# Changelog

- 1.0.8

  - Fixed logs

- 1.0.6

  - Fixed main javascript file error

- 1.0.5

  - Added descriptions to types.

- 1.0.4

  - Added Types

- 1.0.2

  - Fixed not importing issues

- 1.0.1

  - Added README

- 1.0.0

  - Published
