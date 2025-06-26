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
        res.status(500).json({ message: "Failed to create user", error: error.message });
    }
}; 
