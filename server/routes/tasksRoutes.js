import express from 'express'
import { assignTasks, getTasksByProjectId } from '../controllers/tasksController.js'

const router = express.Router();

router.post('/assigntasks', assignTasks);
router.get('/tasks', getTasksByProjectId);


export default router;