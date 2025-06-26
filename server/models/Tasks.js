import mongoose from "mongoose";

const tasksSchema = new mongoose.Schema({
    project_id: {type: String, required: true},
    name: {type: String, required: true},
    description: {type: String, required: true},
    status: {type: String, required: true},
    asssigned_to_user_id: {type: String, required: true},
    due_date: {type: Date, required: true},
    created_by_user_id: {type: String, required: true},
    created_at: {type: Date, required: true},
    updated_at: {type: Date, required: true},
})

export default mongoose.model('tasks', tasksSchema);