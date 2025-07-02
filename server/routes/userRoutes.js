import express, { Router } from 'express';
import { createUser, loginUser, logoutUser, getAllUsers } from "../controllers/userController.js";

const router = express.Router();

router.post("/create-user", createUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/getAllUsers", getAllUsers);

export default router;