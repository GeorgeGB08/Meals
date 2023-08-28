class AppError extends Error {
    constructor(message, statusCode) {
      super(message);
      
      this.statusCode = statusCode;
      this.message = message;
      
      
      this.status = `${statusCode}`.startsWith("4") ? "error" : "fail";
  
      
      Error.captureStackTrace(this);
    }
  }
  
  module.exports = AppError ;