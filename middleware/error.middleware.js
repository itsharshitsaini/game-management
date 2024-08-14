function errorHandler(err, req, res, next) {
    console.error(err.stack); // Log the error stack for debugging

    // Set default error response
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';

    res.status(statusCode).json({
        success: false,
        status: statusCode,
        message: message,
        stack: err.stack 
    });
}

module.exports = errorHandler;
