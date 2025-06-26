import express, { Router } from 'express';
import { createUser } from "../controllers/userController.js";

const router = express.Router();

router.post("/create-user", createUser)

export default router;