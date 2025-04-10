
/**
 * TypeScript definitions for Google Apps Script
 */
declare namespace google {
  namespace script {
    /**
     * The `run` object allows client-side code to call server-side Apps Script functions
     */
    const run: {
      /**
       * Calls a server-side function with the given name
       */
      [functionName: string]: any;

      /**
       * Sets success handler for the server-side function call
       */
      withSuccessHandler<T>(callback: (response: T) => void): typeof google.script.run;

      /**
       * Sets failure handler for the server-side function call
       */
      withFailureHandler(callback: (error: Error) => void): typeof google.script.run;
    };
  }
}
