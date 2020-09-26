declare class LogClass {
    /**
     *
     * Without **$** sign just use { }.
  
      ```Log.raw(myobj, "{property}")```
  
     * @param object
     * @param params
     */
    raw: (object: object, params: string) => void;
    /**
     * With **$** sign  use ${ }.
  
      ```Log.raw(myobj, "${property}")```
     *
     * @param object
     * @param params
     */
    obj: (object: object, params: string) => void;
    /**
     * Throw **error** with Dollar signed syntax
     *
     * Throw Log.error(myobj, "${property}")
     *
     * @param object
     * @param params
     */
    error: (object: object, params: string) => Error;
    /**
     *  Throw **error** without Dollar sign
     *
     * Throw Log.error(myobj, "{property}")
     *
     * @param object
     * @param params
     */
    error_raw: (object: object, params: string) => Error;
}
/**
 * Use template literal like syntax
 *
 * Detailed tutorial => https://www.npmjs.com/package/log-object
 */
export declare let Log: LogClass;
export {};
