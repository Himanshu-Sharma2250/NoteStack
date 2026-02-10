import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { User } from "../models/user.model.js";
import { loginUserSchema, registerUserSchema } from "../validators/auth.validator.js";

export const registerUser = async (req, res) => {
    // get the username, email, password
    const {data, error} = registerUserSchema.safeParse(req.body);

    if (error) {
        console.error("Error - ", error);
        return res.status(400).json({
            success: false,
            message: "Error occured"
        })
    }

    const {username, email, password} = data;
    // check if they present
    if (!username || !email || !password) {
        return res.status(400).json({
            success: false,
            message: "All fields are required"
        })
    }

    try {
        const existingUser = await User.findOne({email});
        if (existingUser) {
            return res.status(401).json({
                success: false,
                message: 'User already registered'
            })
        }

        const user = await User.create({
            username,
            email,
            password
        });

        res.status(201).json({
            success:true,
            message: "User registered successfully",
            user
        })
    } catch (error) {
        console.error("Error registering user ", error);
        res.status(500).json({
            success: false,
            message: "Failed to register user"
        })
    }
}

export const loginUser = async (req, res) => {
    // get the email and password
    // validate the email and password
    // get the user and validate
    // match if the password is same
    // create a jwt token and store it in cookie

    const {data, error} = loginUserSchema.safeParse(req.body);

    if (error) {
        console.error("Error - ", error);
        return res.status(400).json({
            message: "Error occured parsing"
        })
    }

    const { email, password } = data;

    if (!email || !password) {
        return res.status(401).json({
            success:false,
            message: "All fields required"
        })
    }

    try {
        const user = await User.findOne({email:email});

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        const isMatch = await bcrypt.compare(password.toString(), user.password);

        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Either Email or Password is wrong"
            })
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET, 
            { expiresIn: '24h' }
        );

        const cookieOption = {
            secure: true,
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24,
            sameSite: "none"
        }

        res.cookie("AccessToken", token, cookieOption);

        res.status(200).json({
            success: true,
            message: "User login successful",
            token,
            user: {
                id: user._id,
                name: user.username,
                role: user.role
            }
        })
    } catch (error) {
        console.error("Error in user login - ", error);
        res.status(500).json({
            success: false,
            message: "Error in User login"
        })
    }
}

export const profile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found"
            })
        }

        res.status(200).json({
            success: true,
            message: "User profile:",
            user
        })
    } catch (error) {
        console.error("Error in getting Profile - ", error);
        res.status(500).json({
            success: false,
            message: "Error in getting Profile"
        })
    }
}

export const logoutUser = async (req, res) => {
    // check if user logged in
    // then remove the cookie token
    try {
        const user = await User.findById(req.user.id).select('-password');

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "user logged out or doesnot exist"
            })
        }

        res.cookie("AccessToken", "", {
            expires: new Date(0)
        });

        res.status(200).json({
            success: true,
            message: "User logged out successfully"
        })
    } catch (error) {
        console.error("Error in log out -", error);
        res.status(500).json({
            success: false,
            message: "Error in logout"
        })
    }
}