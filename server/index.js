import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';


import projectsRoutes from './routes/projectsRoutes.js'; 
import userRoutes from './routes/userRoutes.js';
import tasksRoutes from './routes/tasksRoutes.js';


import authMiddleware from './middleware/authMiddleware.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api',userRoutes)

app.get("/", (req, res) => {
  res.send("API running");
});

app.use(authMiddleware);
app.use('/api/projects', projectsRoutes);
app.use('/api', tasksRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => app.listen(process.env.PORT || 5000, () =>
    console.log("Server running...")))
  .catch(err => console.log(err));