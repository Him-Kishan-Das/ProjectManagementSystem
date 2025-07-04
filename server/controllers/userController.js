import Users from '../models/Users.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
if(!JWT_SECRET){
    console.error('FATA: ERROR: JWT_SECRET is not defined in environment variables.');
    process.exit(1);
}


export const createUser = async (req, res) => { 
    try {
        const user = new Users({
            email: req.body.email,
            password: req.body.password,
            name: req.body.name,
            role: req.body.role,
            created_at: new Date(),
            updated_at: new Date()
        });

        const saveUsers = await user.save();
        res.status(201).json(saveUsers);
    } catch (error) {
        console.error("Error creating user:", error);

        if(error.code === 11000 && error.keyPattern && error.keyPattern.email){
            return res.status(409).json({ message: "This email address is already registered. Please use a different email or log in." });
        }
        else if (error.name == 'ValidationError'){
            const errors = Object.values(rrror.errors).map(err => err.message);
            return res.status(400).json({ message: "Balidation failed", errors: errors });
        }

        res.status(500).json({ message: "Failed to create user", error: error.message });
    }
}; 


export const loginUser = async (req, res) => {
    try{
        const {email, password} = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required.' });
        }
        
        const user = await Users.findOne({ email });

        if(!user){
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        

        if( user.status !== 'active'){
            let statusMessage = '';
            switch (user.status) {
                case 'pending':
                    statusMessage = 'Your account is pending activation. Please check your email for verification';
                    break;
                case 'rejected':
                    statusMessage = 'Your account has been rejected. Please contact support.';
                default:
                    statusMessage = 'Your account is not active. Please contact support.';
            }
            return res.status(403).json({ message: statusMessage });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!user.password) {
            console.error(`User ${user.email} found but has no password stored.`);
            return res.status(500).json({ message: 'Server error: User data corrupted.' });
        }

        if(!isMatch){
            return res.status(400).json({ message: 'Invalid email or password'});
        }

        const payload = {
            userId: user._id,
            email: user.email,
            name: user.name,
            role: user.role,
            status: user.status,
        };

        const token = jwt.sign(
            payload, 
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        const { password: userPassword, ...userWithoutPassword } = user._doc;

        res.status(200).json({
            message: 'Login successful',
            token: token,
            user: userWithoutPassword
        });

    }
    catch(error){
        console.error("Error during login: ", error);
        res.status(500).json({ message: "Server error during login", error: error.message });
    }
};

export const logoutUser = (req, res) =>{
    res.status(200).json({ message: "Logout successful" });
}



export const getAllUsers = async (req, res) => {
    try {
        const users = await Users.find({});
        res.status(200).json(users);
    } catch (error) {
        console.error("Error during fetching users data: ", error);
        res.status(404).json({ message: "Users Data fetching failed", error: error.message });
    }
}

export const getPendingUsers = async (req, res) => {
    try {
        const pendingUsers = await Users.find({status: "pending"});
        res.status(200).json(pendingUsers);
    } catch (error) {
        console.error("Error during fetching pending users data: ", error);
        res.status(404).json({ message: "Pending Users Data fetching failed", error: error.message });
    }
}

export const getActiveUsers = async (req, res) => {
    try {
        const activeUsers = await Users.find({ status: "active" });
        res.status(200).json(activeUsers);
    } catch (error) {
        console.error("Error during fetching active users data: ", error);
        res.status(404).json({ message: "Active Users Data fetching failed", error: error.message });
    }
}

export const getRejectedUsers = async (req, res) => {
    try {
        const rejectedUsers = await Users.find({ status: "rejected" });
        res.status(200).json(rejectedUsers);
    } catch (error) {
        console.error("Error during fetching rejected users data: ", error);
        res.status(404).json({ message: "Rejected Users Data fetching failed", error: error.message });
    }
}


export const assignUserRoles = async (req, res) => {
    try {
        const {userId, role} = req.body;

        if(!userId || !role){
            return res.status(400).json({message: "User Id and role are required"});
        }

        const allowedRoles = ["manager","member", "admin"];
        if(!allowedRoles.includes(role)){
            return res.status(400).json({message: "Invalid role specified."});
        }

        const user = await Users.findById(userId);

        if(!user){
            return res.status(404).json({message: "User not found."});
        }

        user.role = role;
        user.status = "active";
        await user.save();

        res.status(200).json({message: "User role assigned successfully.", user});
    } catch (error) {
        console.error("Error assigning user role assignment.", error);
        res.status(500).json({message: "Server error during role assignment.", error: error.message});
    }
}


export const revokeUserRole = async (req, res) => {
    try {
        const {userId} = req.body;

        if(!userId){
            return res.status(400).json({ message: "User ID is required to revoke a role." });
        }

        const user = await Users.findById(userId);

        if(!user){
            return res.status(404).json({message: "User not found."});
        }

        user.role = null;
        user.status = "rejected";

        await user.save();

        res.status(200).json({
            message: "User role revoked successfully and status set to 'rejected'.",
            user
        });
    } catch (error) {
        console.error("Error revoking user role: ", error);
        res.status(500).json({
            message: "An error occured while revoking the user role.",
            error: error.message
        });
    }
};