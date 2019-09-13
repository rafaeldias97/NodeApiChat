const jwt = require('jsonwebtoken');

const authorize = (req, res, next) => {
    var token = req.headers.authorization.replace("Bearer ", "");
    if (token !== undefined && token !== 'null' && token !== '') {
        jwt.verify(token, "dd%88*337f6d&fJAFAS**$#&dfasd)@E#sjdis", (err, decoded) => {
            if (!err) {
                if (decoded.expire > Date.now()) {
                    req.user = decoded;
                    next();
                } else {
                    res.status(401).json({ msg: 'Token expired' });
                }
            } else {
                res.status(401).json({ msg: err.message });
            }
        });
    } else {
        res.status(401).json({ msg: "Token not found" });
    }
}

module.exports = authorize;