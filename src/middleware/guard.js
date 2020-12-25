const User = require('../models/user');
const jwt = require('jsonwebtoken');

exports.authenticate = async (req, res, next) => {
    const authorization = req.headers.authorization;

    if (!authorization || !authorization.startsWith('Bearer')) {
        return res.status(401).json({ status: 401, message: 'Not authenticated' })
    }

    try {
        const token = authorization.replace('Bearer ', '');
        const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const user = await User.findOne({_id: payload.id, 'tokens.token': token });

        if (!user) {
            return res.status(401).json({status: 401, message: 'Not authenticated'})
        }

        req.user = user;
        next()
    } catch (e) {
        res.status(401).json({ status: 401, message: 'Not authenticated' });
    }
};

exports.authorize = (...roles) => {
    return (req, res, next) => {
        const role = req.user.role;

        console.log('role: ', role);
        console.log('roles: ', roles);

        if (!roles.includes(role)) {
            return res.status(403).json({ status: 403, message: `User with role ${role} is unauthorized to access this route` })
        }

        next();
    }
};