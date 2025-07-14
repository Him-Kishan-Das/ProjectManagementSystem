import Tasks from '../models/Tasks.js';

export const assignTasks = async (req, res) => {
    try {
        const tasks = req.body;

        if (!Array.isArray(tasks) || tasks.length === 0) {
            return res.status(400).json({ message: 'Tasks array is required' });
        }

        const validatedTasks = tasks.map(task => {
            const { project_id, name, description, assigned_to_user_id, due_date, created_by_user_id } = task;

            // Validate required fields, excluding 'status' as it will be set automatically
            if (!name || !project_id || !description || !assigned_to_user_id || !due_date || !created_by_user_id) {
                // Providing more specific error messages for missing fields
                const missingFields = [];
                if (!name) missingFields.push('name');
                if (!project_id) missingFields.push('project_id');
                if (!description) missingFields.push('description');
                if (!assigned_to_user_id) missingFields.push('assigned_to_user_id');
                if (!due_date) missingFields.push('due_date');
                if (!created_by_user_id) missingFields.push('created_by_user_id');
                throw new Error(`Invalid task format: Missing required fields: ${missingFields.join(', ')}`);
            }

            return {
                project_id,
                name,
                description,
                assigned_to_user_id,
                due_date,
                // Automatically set status to "To Do"
                status: 'To Do',
                created_by_user_id
            };
        });

        const createdTasks = await Tasks.insertMany(validatedTasks);

        res.status(201).json({
            message: `${createdTasks.length} tasks created successfully`,
            tasks: createdTasks
        });

    } catch (error) {
        console.error('Error creating tasks: ', error);
        // Send a more informative error message to the client
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
