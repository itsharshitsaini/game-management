const errorHandler = (err, req, res, next) => {
    console.error(err.stack); // Log error stack for debugging purposes

    // Determine the error type and respond accordingly
    if (err.name === 'ValidationError') {
        return res.status(400).json({ message: 'Validation error', details: err.errors });
    }

    if (err.name === 'UnauthorizedError') {
        return res.status(401).json({ message: 'Unauthorized access' });
    }

    if (err.name === 'NotFoundError') {
        return res.status(404).json({ message: 'Resource not found' });
    }

    // Handle other types of errors
    return res.status(500).json({ message: 'Internal server error', details: err.message });
};

module.exports = errorHandler;
