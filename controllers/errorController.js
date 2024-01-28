const AppError = require('../utils/appError');

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    stack: err.stack,
    error: err,
  });
};

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}:${err.value}`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err) => {
  console.log(err);
  const message = `Duplicate field value : ${err.keyValue.name}. Please use another value!`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
  const errors=Object.values(err.err).map(el=>el.message)
  const message = `Input input Data. ${errors.join('. ')}`;
  return new AppError(message, 400);
};

const sendErrorProd = (err, res) => {
  //Operational , trusted error :send message to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }
  //Programming or other error  : don't leak error details
  else {
    res.status(500).json({
      status: 'error',
      message: 'Something went wrong',
    });
  }
};

const handleJWTError=()=>new AppError('Invalid Token, please login again',401)

const handleJWTExpiredError=()=>new AppError('Your token has expired! Please log in again',401)

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV == 'development') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV == 'production') {
    let error = { ...err };
    if (err.name == 'CastError') {
      error = handleCastErrorDB(error);
    }
    if (error.code == 11000) {
      error = handleDuplicateFieldsDB(error);
    }
    if (error.name === 'ValidationError') {
      error=handleValidationErrorDB(error);
    }
    if(error.name=='JsonWebTokenError')
    {
      error=handleJWTError()
    }
    if(error.name=='TokenExpiredError')
    {
      error=handleJWTExpiredError()
    }
    sendErrorProd(error, res);
  }
};
