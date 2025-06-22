import express, { request } from "express";
import Projects from "../models/Project.js";

const router = express.Router();

router.post("/create-project", async (req, res) => {
  try {
    const project = new Projects({
      name: req.body.name,
      description: req.body.description,
      created_by_user_id: req.body.created_by_user_id,
      member_ids: req.body.member_ids,
      created_at: new Date(),
      updated_at: new Date()
    });

    const savedProject = await project.save();
    res.status(201).json(savedProject);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
