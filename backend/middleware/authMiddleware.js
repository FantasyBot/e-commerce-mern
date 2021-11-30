import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import asyncHandler from 'express-async-handler';


const protect = asyncHandler(async (req, res, next) => {
    let token;
    // console.log(req.headers.authorization); => bearer and token 
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            //get user's id, iat and exp (date) into decoded 
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            // create user element in req obj
            req.user = await User.findById(decoded.id).select('-password');
            // console.log(req.user); 
            // consoles user, which matches decoded token id
            return next();
        } catch (error) {
            console.error(error.message);
            res.status(401);
            return next('Not authorized token failed');
        }
    }
    if (!token) {
        res.status(401);
        return next('Not authorized, no token');
    }
    return next();
})

const admin = (req, res, next) => {
    try {
        if (req.user && req.user.isAdmin) {
            next();
        } else {
            res.status(401);
            return next('Not authorized as an admin');
        }
    } catch (error) {
        console.log(error.message);
        res.status(401);
        return next('Not authorized as an admin "catch"');
    }
}

export { protect, admin }