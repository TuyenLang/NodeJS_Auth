import express from 'express';
import {addNewUser, getAllUsers, login, me, register} from './userController';
import authenticate from '../middlewares/authenticate';
const userRouter = express.Router();
const adminRouter = express.Router();
userRouter.post('/register', register);

userRouter.post('/login', login);

adminRouter.get('/allusers',authenticate, getAllUsers); 
adminRouter.post('/addnewuser',authenticate, addNewUser);
userRouter.get('/me',authenticate, me);
export {userRouter, adminRouter}; ;