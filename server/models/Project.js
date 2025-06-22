import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({ 
    name: {type: String, required: true},
    description: {type: String, required: true},
    created_by_user_id: {type: String, required: true},
    member_ids: {type: Array, required: true},
    created_at: {type: Date, required: true},
    updated_at: {type: Date, required: true}
})

export default mongoose.model('projects', projectSchema);