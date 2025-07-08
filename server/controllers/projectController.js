import Project from "../models/Project.js";
import Projects from "../models/Project.js";
import { getUserById } from "./userController.js";

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


export const projectMembersDetails = async (req, res) =>{
    try {
        const projectId = req.query.project_id;

        if(!projectId){
            return res.status(400).json({message: 'project_id query parameter is required.'});
        }

        const project = await Project.findById(projectId);

        if(!project){
            return res.status(404).json({ message: "Projects not found with the provided ID." });
        }
        
        const memberIds = project.member_ids;

        let membersData = [];

        if(memberIds && memberIds.length > 0){
            membersData = await getUserById(memberIds);
        }

        res.status(200).json({
            project: {
                _id: project._id,
                name: project.name,
                description: project.description,
                created_by_user_id: project.created_by_user_id,
                members_details: membersData, 
                created_at: project.created_at,
                updated_at: project.updated_at,
                __v: project.__v
            },
            message: "Project details with ALL member details fetched successfully."
        })
        
        
    } catch (error) {
        console.error("Error fetching project and ALL member details:", error);

        if (error.name === 'CastError') {
            return res.status(400).json({ error: "Invalid Project ID format." });
        }
        // Catch any errors thrown by getUsersByIds as well
        if (error.message === "Failed to retrieve user details.") {
            return res.status(500).json({ error: "Could not fetch all member details." });
        }

        res.status(500).json({ error: "Failed to fetch Project and Member Data. Please try again later." });
    }
}