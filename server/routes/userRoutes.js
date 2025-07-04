import express, { Router } from 'express';
import { createUser, loginUser, logoutUser, getAllUsers, getPendingUsers, getActiveUsers, getRejectedUsers, assignUserRoles, revokeUserRole } from "../controllers/userController.js";

const router = express.Router();

router.post("/create-user", createUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/getAllUsers", getAllUsers);
router.get("/getPendingUsers", getPendingUsers);
router.get("/getActiveUsers", getActiveUsers);
router.get("/getRejectedUsers", getRejectedUsers);


router.post("/assignUserRole", assignUserRoles);
router.put("/revokeUserRole", revokeUserRole);

export default router;