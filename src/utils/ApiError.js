class ApiError extends Error {
   constructor(
      statusCode,
      message = "something went wrong",
      errors = [],
      stack = ""
   ) {
      super(message);
      this.statusCode = statusCode;
      this.data = null; //this.data can be used to attach additional information to the error object
      this.success = false;
      this.errors = errors;

      //getting where the error generated from
      if (stack) {
         this.stack = stack;
      } else {
         Error.captureStackTrace(this, this.constructor);
      }
   }
}
export { ApiError };
