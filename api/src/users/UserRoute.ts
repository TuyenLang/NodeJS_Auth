import express from 'express';
import {login, me, register} from './userController';
import authenticate from '../middlewares/authenticate';
const userRouter = express.Router();

userRouter.post('/register', register);

userRouter.post('/login', login);


userRouter.get('/me',authenticate, me);
export default userRouter;