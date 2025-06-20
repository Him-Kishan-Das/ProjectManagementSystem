import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API running");
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => app.listen(process.env.PORT || 5000, () =>
    console.log("Server running...")))
  .catch(err => console.log(err));
