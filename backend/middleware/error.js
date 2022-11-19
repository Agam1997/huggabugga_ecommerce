const ErrorHandler = require("../utils/errorHandler");

module.exports = (err, req,res, next) => {

    err.statusCode = err.statusCode ? err.statusCode : 500;

    err.message = err.message ? err.message : "Internal server error";

    // catch mongo errors

    if(err.name === "CastError") {
        const message = `Resource not found. Invalid: ${err.path}`;
        err = new ErrorHandler(message, 400);
    }
    if(err.code === 11000){
        const message = `Duplicate ${Object.keys(err.keyValue)} entered`
        err = new ErrorHandler(message, 400);
    }

    // wrong jwt
    if(err.name === "JsonWebTokenError") {
        const message = `Json web token is invalid, try again`;
        err = new ErrorHandler(message, 400);
    }
    if(err.name === "TokenExpiredError") {
        const message = `Json web token expired, try again`;
        err = new ErrorHandler(message, 400);
    }
    res.status(err.statusCode).json({
        status: false,
        message: err.message,
        stack: err.stack
    });
};