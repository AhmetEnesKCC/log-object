"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Log = void 0;
let log = "Log";
let error = "Error";
let warn = "Warn";
let table = "Table";
function parseSubObjects(object_string) {
    let obj_arr = [];
    let obj = [];
    object_string = object_string.split(".");
    object_string.forEach((item) => {
        obj.push(item);
        obj_arr.push(...obj);
        obj = [];
    });
    return obj_arr;
}
function makeObjectWithSubs(object_parsed, object_raw) {
    let parsedArray = parseSubObjects(object_parsed);
    let parsedString = `object_raw`;
    parsedArray.forEach((item) => {
        parsedString += `["${item}"]`;
    });
    return eval(parsedString);
}
function parseParams(params, object_raw) {
    let param = [];
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
        if ((params[i] === "$" && params[i + 1] === "{" && param[i + 2] !== "}") ||
            param_mode) {
            if (param_mode === false) {
                param_mode = true;
            }
            if (params[i] !== "$" &&
                params[i + 1] !== "{" &&
                params[i] !== "{" &&
                params[i - 1] !== "$") {
                param.push(params[i]);
            }
            continue;
        }
        new_str += params[i];
    }
    return new_str;
}
function parseRaw(params, object_raw) {
    let param = [];
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
    constructor() {
        /**
         *
         * Without **$** sign just use { }.
      
          ```Log.raw(myobj, "{property}")```
      
         * @param object
         * @param params
         */
        this.raw = (object, params) => {
            console.log(parseRaw(params, object));
        };
        /**
         * With **$** sign  use ${ }.
      
          ```Log.raw(myobj, "${property}")```
         *
         * @param object
         * @param params
         */
        this.obj = (object, params) => {
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
        this.error = (object, params) => {
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
        this.error_raw = (object, params) => {
            return Error(parseRaw(params, object));
        };
    }
}
/**
 * Use template literal like syntax
 *
 * Detailed tutorial => https://www.npmjs.com/package/log-object
 */
exports.Log = new LogClass();
