import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    name: {type: String, required: true},
    role: {type: String},
    status: {type: String, default: 'pending'},
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now}
});

userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        return next();
    }

    try{
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    }
    catch(error){
        next(error);
    }
});

export default mongoose.model('users', userSchema);