import mongoose from "mongoose";

const tasksSchema = new mongoose.Schema({
    project_id: {type: String, required: true},
    name: {type: String, required: true},
    description: {type: String, required: true},
    status: {type: String, required: true},
    assigned_to_user_id: {type: String, required: true},
    due_date: {type: Date, required: true},
    created_by_user_id: {type: String, required: true},
    created_at: { type: Date, default: Date.now },
    updated_at: {type: Date, default: Date.now},
})

export default mongoose.model('tasks', tasksSchema);