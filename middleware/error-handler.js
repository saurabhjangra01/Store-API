

const errorHandler = (err, req, res, next) => {
    console.log(err);

    return res.status(500).json({
        message: err.message || 'Something went wrong. Please try again later',
        error: err
    });
}

module.exports = errorHandler;