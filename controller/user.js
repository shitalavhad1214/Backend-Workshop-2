const User = require('../model/user');
const bcrypt = require('bcrypt');

exports.createUser = async (req, res) => {
    try {
        const { name, email, password, mobileNumber, role } = req.body;

        const hpass = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            name,
            email,
            password: hpass,
            mobileNumber,
            role,
        });

        return res.status(201).json({
            message: "User created",
            data: newUser,
        });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({
            message: "Server error",
        });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();

        res.status(200).json({
            message: "Users fetched successfully",
            data: users,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error fetching users",
            error: error.message,
        });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const id = req.params.id;

        const user = await User.findById(id);

        if (!user) {
            return res.json({
                message: "user not found"
            });
        }

        res.json({
            message: "user Found Successfully",
            data: user
        });

    } catch (err) {
        res.json({
            message: "something went wrong"
        });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const id = req.params.id;

        const user = await User.findByIdAndUpdate(id, req.body, { new: true });

        if (!user) {
            return res.json({
                message: "user not found"
            });
        }

        res.json({
            message: "user updated Successfully",
            data: user
        });

    } catch (err) {
        res.json({
            message: "error in update"
        });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const id = req.params.id;

        const user = await User.findByIdAndDelete(id);

        if (!user) {
            return res.json({
                message: "user not found"
            });
        }

        res.json({
            message: "user deleted Successfully"
        });

    } catch (err) {
        res.json({
            message: "error in delete"
        });
    }
};