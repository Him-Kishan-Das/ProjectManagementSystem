import Users from '../models/Users.js'; 

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
