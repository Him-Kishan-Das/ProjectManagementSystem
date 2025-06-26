import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    email: {type: String, unique: true},
    password: {type: String, required: true},
    name: {type: String, required: true},
    role: {type: String, required: true},
    created_at: {type: Date, required: true},
    updated_at: {type: Date, required: true}
})

export default mongoose.model('users', userSchema);