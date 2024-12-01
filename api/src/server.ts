import express from 'express';
import config from './config/config';
import userRouter from './users/UserRoute';
import db from './config/db';
import cors from 'cors';
const app = express(); // Create an Express app

app.use(express.json());
app.use(cors());
db(); // Middleware to parse JSON bodies

app.use('/api/users', userRouter); // Mount the UserRoute at /api
app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
})