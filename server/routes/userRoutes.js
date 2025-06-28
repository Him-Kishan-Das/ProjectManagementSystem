import express, { Router } from 'express';
import { createUser, loginUser } from "../controllers/userController.js";

const router = express.Router();

router.post("/create-user", createUser);
router.post("/login", loginUser);

export default router;