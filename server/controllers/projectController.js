import Projects from "../models/Project.js";

export const createProject = async (req, res) =>{
    try{
        const project = new Projects({
            name: req.body.name,
            description: req.body.description,
            created_by_user_id: req.body.created_by_user_id,
            member_ids: req.body.member_ids,
            progress: 'progress',
            created_at: new Date(),
            updated_at: new Date()
        });

        const savedProject = await project.save();
        res.status(201).json(savedProject);
    } catch(err){
        console.error("Error creating project: ", err);
        res.status(500).json({ error: "Failed to create project", details: err.message });
    }
}



export const getAllProjects = async (req, res) => {
    try {
        const projects = await Projects.find({});
        res.status(200).json(projects);
    } catch (error) {
        console.error("Error caught finding all projects: ", error);
        res.status(500).json({ error: "Failed to fetch all projects" });
    }
}

export const completedProjects = async (req, res) => {
    try {
        const projects = await Projects.find({ status: "Completed" });
        res.status(200).json(projects);
    } catch (error) {
        console.error("Error caught finding completed projects: ", error);
        res.status(500).json({ error: "Failed to fetch completed projects" });
    }
}

export const inProgressProjects = async (req, res) =>{
    try {
        const projects = await Projects.find({ status: "inProgress" });
        res.status(200).json(projects);
        
    } catch (error) {
        console.error("Error caught finding inProgress projects; ", error);
        res.status(500).json({ error: "Failed to fetch inProgress projects" });
    }
}

