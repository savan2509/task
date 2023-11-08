module.exports = (err, req, res, next) => {
    const status = err.status || 'fail';
    const message = err.message  || 'internal server error';
    const statusCode = err.statusCode || 500;

        return res.status(statusCode).json({
            status:status,
            message:message
        });
}