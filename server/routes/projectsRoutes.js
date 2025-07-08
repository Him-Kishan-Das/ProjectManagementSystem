import express from "express";
import { createProject, getAllProjects, completedProjects, inProgressProjects, projectMembersDetails } from "../controllers/projectController.js";


const router = express.Router();

router.post("/create-project", createProject );
router.get("/allProjects", getAllProjects);
router.get("/completedProjects", completedProjects);
router.get("/inProgressProjects", inProgressProjects);

router.get("/projectMembers", projectMembersDetails);

export default router;