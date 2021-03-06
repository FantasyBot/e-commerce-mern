import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';


// Auth user & get token
// POST/api/users/login
// Public
const authUser = async (req, res, next) => {
    const { email, password } = req.body;
    
    try {
        const user = await User.findOne({ email });
        if (user && (await user.matchPassword(password))) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user._id)
            })
        } else {
            res.status(401)
            return next('Invalid email or password');
        }
    } catch (err) {
        res.status(401)
        return next(err);
    }
}

// Register new user
// POST/api/users
// Public
const registerUser = async (req, res, next) => {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400)
        return next("User already exists")
    }

    try {
        const user = await User.create({
            name,
            email,
            password
        })
        if (user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user._id)
            })
        } else {
            res.status(400);
            return next("Invalid user data")
        }
    } catch (err) {
        res.status(400);
        return next(err.message)
    }
}

// Get user profile
// GET/api/users/profile
// Private
const getUserProfile = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id)
        // find user with req.user._id // now user includes password too// can be set req.user...
        if (user) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
            })
        } else {
            res.status(404);
            return next('User not found');
        }
    } catch (err) {
        res.status(404);
        return next(err.message)
    }
}

// Update user profile
// Put/api/users/profile
// Private
const updateUserProfile = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id)
        if (user) {
            user.name = req.body.name || user.name
            user.email = req.body.email || user.email
            if (req.body.password) {
                user.password = req.body.password
            }
            const updatedUser = await user.save();
            res.json({
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                isAdmin: updatedUser.isAdmin,
                token: generateToken(updatedUser._id),
            })
        } else {
            res.status(404);
            return next("User not found")
        }
    } catch (err) {
        res.status(404);
        return next(err.message)
    }
}

// Get all users
// GET/api/users
// Private/Admin
const getUsers = async (req, res, next) => {
    try {
        const users = await User.find({})
        res.json(users);
    } catch (err) {
        console.log(err.message)
        res.status(404);
        return next('Users Not Found')
    }
}

// Delete user
// DELETE/api/users/:id
// Private/Admin
const deleteUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id)
        if (user) {
            await user.remove();
            res.json({ message: 'User removed' });
        }
    } catch (err) {
        console.log(err.message)
        res.status(404);
        return next('User Not Found')
    }
}

// Get user by id
// GET/api/users/:id
// Private/Admin
const getUserById = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        res.json(user);
    } catch (err) {
        console.log(err.message)
        res.status(404);
        return next('User Not Found')
    }
}

// Update user
// PUT/api/users/:id
// Private/Admin
const updateUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id)
        if (user) {
            user.name = req.body.name || user.name
            user.email = req.body.email || user.email
            user.isAdmin = req.body.isAdmin || user.isAdmin

            const updatedUser = await user.save()

            res.json({
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                isAdmin: updatedUser.isAdmin,
            })
        } else {
            res.status(404)
            return next('User not found')
        }
    } catch (err) {
        console.log(err)
        res.status(404)
        return next('User not found')
    }
}


export {
    authUser,
    getUserProfile,
    registerUser,
    updateUserProfile,
    getUsers,
    deleteUser,
    getUserById,
    updateUser
}