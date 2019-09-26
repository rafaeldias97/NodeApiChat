const jwt = require('jsonwebtoken');

const authorize = (req, res, next) => {
    var token = ''
    if (req.headers.authorization)
        token = req.headers.authorization.replace("Bearer ", "");
        
    if (token !== undefined && token !== 'null' && token !== '') {
        jwt.verify(token, "dd%88*337f6d&fJAFAS**$#&dfasd)@E#sjdis", (err, decoded) => {
            if (!err) {
                if (decoded.expire > Date.now()) {
                    req.user = decoded;
                    next();
                } else {
                    res.status(401).json({ msg: 'Sua sessão expirou' });
                }
            } else {
                res.status(401).json({ msg: err.message });
            }
        });
    } else {
        res.status(401).json({ msg: "Voce não está autorizado" });
    }
}

module.exports = authorize;