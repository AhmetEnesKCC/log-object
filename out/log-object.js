"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Log = void 0;
class LogClass {
    constructor() {
        /*
          Define Object Name as a first parameter and string will be second.
        */
        this.raw = (object, params) => { };
        this.obj = (object, params) => {
            let param = [];
            let param_all = [];
            let new_str = "";
            let param_mode = false;
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
            function makeObjectWithSubs(object_parsed) {
                let parsedArray = parseSubObjects(object_parsed);
                let parsedString = `object`;
                parsedArray.forEach((item) => {
                    parsedString += `["${item}"]`;
                });
                return eval(parsedString);
            }
            function parseParams() {
                for (var i = 0; i < params.length; i++) {
                    if (param_mode && params[i] === "}") {
                        param_mode = false;
                        param = param.join("");
                        param_all.push(param);
                        new_str += makeObjectWithSubs(param);
                        param = [];
                        continue;
                    }
                    if ((params[i] === "$" &&
                        params[i + 1] === "{" &&
                        param[i + 2] !== "}") ||
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
                console.log(new_str);
            }
            parseParams();
        };
    }
}
exports.Log = new LogClass();
