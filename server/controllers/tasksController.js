import Tasks from '../models/Tasks.js';

export const assignTasks = async (req, res) => {
    try {
        const tasks = req.body;

        if(!Array.isArray(tasks) || tasks.length === 0){
            return res.status(400).json({ message: 'Tasks array is required' });
        }

        const validatedTasks = tasks.map(task => {
            const {project_id, name, description, status, assigned_to_user_id, due_date, created_by_user_id } = task;

            if(!name || !project_id || !status || !description || !assigned_to_user_id || !due_date || !created_by_user_id){
                throw new Error('Invalid task format');
            }

            return {
                project_id,
                name, 
                description,
                assigned_to_user_id,
                due_date,
                status,
                created_by_user_id
            }
        })

        const createdTasks = await Tasks.insertMany(validatedTasks);

        res.status(201).json({
            message: `${createdTasks.length} tasks created successfully`,
            tasks: createdTasks
        });

    } catch (error) {
        console.error('Error creating tasks: ', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

