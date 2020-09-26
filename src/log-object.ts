class LogClass {
  /* 
    Define Object Name as a first parameter and string will be second.
  */
  raw = (object: object, params: string): void => {};

  obj = (object: object, params: string): void => {
    let param: any = [];
    let param_all: string[] = [];
    let new_str: string = "";
    let param_mode: boolean = false;
    function parseSubObjects(object_string: any): string[] {
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
    function makeObjectWithSubs(object_parsed: string[]): string {
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
        if (
          (params[i] === "$" &&
            params[i + 1] === "{" &&
            param[i + 2] !== "}") ||
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
      console.log(new_str);
    }
    parseParams();
  };
}

export let Log = new LogClass();
