type parseSubObjects = string[];
type log = string;

let log: log = "Log";
let error: log = "Error";
let warn: log = "Warn";
let table: log = "Table";
function parseSubObjects(object_string: any): parseSubObjects {
  let obj_arr: string[] = [];
  let obj: string[] = [];
  object_string = object_string.split(".");
  object_string.forEach((item: string) => {
    obj.push(item);
    obj_arr.push(...obj);
    obj = [];
  });
  return obj_arr;
}

function makeObjectWithSubs(
  object_parsed: string[],
  object_raw: object
): string {
  let parsedArray = parseSubObjects(object_parsed);
  let parsedString = `object_raw`;
  parsedArray.forEach((item) => {
    parsedString += `["${item}"]`;
  });
  return eval(parsedString);
}

function parseParams(params: string, object_raw: object): string {
  let param: any = [];
  let param_all: string[] = [];
  let new_str: string = "";
  let param_mode: boolean = false;
  for (var i = 0; i < params.length; i++) {
    if (param_mode && params[i] === "}") {
      param_mode = false;
      param = param.join("");
      param_all.push(param);
      new_str += makeObjectWithSubs(param, object_raw);
      param = [];
      continue;
    }
    if (
      (params[i] === "$" && params[i + 1] === "{" && param[i + 2] !== "}") ||
      param_mode
    ) {
      if (param_mode === false) {
        param_mode = true;
      }
      if (
        params[i] !== "$" &&
        params[i + 1] !== "{" &&
        params[i] !== "{" &&
        params[i - 1] !== "$"
      ) {
        param.push(params[i]);
      }
      continue;
    }
    new_str += params[i];
  }
  return new_str;
}

function parseRaw(params: string, object_raw: object): string {
  let param: any = [];
  let param_all = [];
  let new_str = "";
  let param_mode = false;
  for (var i = 0; i < params.length; i++) {
    if (param_mode && params[i] === "}") {
      param_mode = false;
      param = param.join("");
      param_all.push(param);
      new_str += makeObjectWithSubs(param, object_raw);
      param = [];
      continue;
    }
    if ((params[i] === "{" && params[i + 1] !== "}") || param_mode) {
      if (param_mode === false) {
        param_mode = true;
      }
      if (params[i] !== "{") {
        param.push(params[i]);
      }
      continue;
    }
    new_str += params[i];
  }
  return new_str;
}

class LogClass {
  /**
   * 
   * Without **$** sign just use { }.

    ```Log.raw(myobj, "{property}")```

   * @param object 
   * @param params 
   */

  raw = (object: object, params: string): void => {
    console.log(parseRaw(params, object));
  };
  /**
   * With **$** sign  use ${ }.

    ```Log.raw(myobj, "${property}")```
   *
   * @param object
   * @param params
   */

  obj = (object: object, params: string): void => {
    console.log(parseParams(params, object));
  };

  /**
   * Throw **error** with Dollar signed syntax
   *
   * Throw Log.error(myobj, "${property}")
   *
   * @param object
   * @param params
   */

  error = (object: object, params: string) => {
    return Error(parseParams(params, object));
  };

  /**
   *  Throw **error** without Dollar sign
   *
   * Throw Log.error(myobj, "{property}")
   *
   * @param object
   * @param params
   */

  error_raw = (object: object, params: string) => {
    return Error(parseRaw(params, object));
  };
}

/**
 * Use template literal like syntax
 *
 * Detailed tutorial => https://www.npmjs.com/package/log-object
 */

export let Log = new LogClass();
