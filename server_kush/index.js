import express from 'express';
import './config/database.js';
import { createUser, getUsers } from './controllers/UserController.js';
import cors from 'cors';
import { assignMarks } from './controllers/MarksController.js';

const app = express();
app.use(express.json());
app.use(cors());

app.post("/api/users", createUser);
app.post("/api/marks", assignMarks);
app.get("/api/users", getUsers);

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});