import express from "express";
import { createProject, getAllProjects, completedProjects, inProgressProjects } from "../controllers/projectController.js";

const router = express.Router();

router.post("/create-project", createProject );
router.get("/allProjects", getAllProjects);
router.get("/completedProjects", completedProjects);
router.get("/inProgressProjects", inProgressProjects);

export default router;