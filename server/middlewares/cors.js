//CORS middleware
module.exports = async (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization X-CSRF-Token');
    res.setHeader('Access-Control-Allow-Private-Network', true);
    res.setHeader('Content-Security-Policy-Report-Only', 'policy');
    // res.setHeader("Cache-Control", "max-age=31536000");
    next();
};