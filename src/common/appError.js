/**
 *    Centralized Error object that adds properties to Node's Error
 * 
 * 
 *    See specific recommendations section:
 *    https://www.joyent.com/node-js/production/design/errors
 */
function appError(name, httpCode, description, isOperational) {
  Error.call(this);
  Error.captureStackTrace(this);
  this.name = name;
  // ... other properties assigned here
};

appError.prototype.__proto__ = Error.prototype;

module.exports.appError = appError;
