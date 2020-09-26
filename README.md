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

Log.obj(myobj, "Hello my name is ${name} and my surname is ${surname}");

// Or new raw syntax ( much more easier with like python f string syntax )

Log.raw(myobj, "Hello my name is {name} and my surname is {surname}");
```

which outputs =>

```sh
    Hello my name is John and surname is Doe
```

## Methots

| Methot    | Syntax                                     |
| --------- | ------------------------------------------ |
| obj       | `Log.obj(myobj , ${name})`                 |
| raw       | `Log.raw(myobj, {name})`                   |
| error     | `throw Log.error(my_error_obj, ${name}`    |
| error_raw | `throw Log.error_raw(my_error_obj, {name}` |

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
// Normal log

/* Syntax 1 = With Dollar Sign */

Log.obj(myobj, "Hello my name is ${name} and surname is ${surname}");

/* Syntax 2 = Without Dollar sign */

Log.raw(myobj, "Hello my name is {name} and surname is {surname}");
```

## New Feature = Throw Log.error()

- You can use same syntax for throw errors

```js

let myPromise = new Promise((res, rej) => {
  if (/* condition */) {
    reject(Log.error(object, string))
  } else {
    resolve(Log.obj(another_object, another_string))
  }
})

or

try {
  fetch("my/path/to/json")
} catch (err) => {

  console.log(err)

  throw Log.error_raw(myobj, string)
}


```

## Thats it.

# Will Come in future

- More methots with array and other types support

- Better syntax

- VS code auto completion extension

# Changelog

- 1.0.9

  - Added new option : raw log

  - You can throw errors with `Log.error(object , string)` or `Log.error_raw(object, string)`

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
