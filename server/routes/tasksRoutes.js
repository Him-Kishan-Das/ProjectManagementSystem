import express from 'express'
import { assignTasks } from '../controllers/tasksController.js'

const router = express.Router();

router.post('/assigntasks', assignTasks);


export default router;