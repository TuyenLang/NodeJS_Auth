import { NextFunction,Response,Request } from 'express';
import UserSchema from "./UserSchema";
import bcrypt from "bcrypt";
import createHttpError from "http-errors";

import { sign } from 'jsonwebtoken';
import config from '../config/config';
import { AuthReuest } from '../middlewares/authenticate';



const register = async(req: Request, res: Response, next: NextFunction)=>{
 
    const {name,email, password} = req.body; 
    if (!name || !email || !password) {

        res.status(400).json({ message: "Please fill all fields" });
        return; // Kết thúc hàm sau khi gửi phản hồi.
    }

    // Kiểm tra email đã tồn tại
    const userFound = await UserSchema.findOne({ email });
    if (userFound) {
        // Thay đổi: Gọi `res.status` trực tiếp thay vì trả về Response.
        res.status(400).json({ message: "Email already exists" });
        return; // Kết thúc hàm sau khi gửi phản hồi.
    }
    try {
        // Kiểm tra nếu các trường không được cung cấp
        

        // Tạo mật khẩu hash và lưu user mới
        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = new UserSchema({
            name,
            email,
            password: hashPassword,
            role: "user",
        });

        // Thay đổi: Thêm `await newUser.save()` để đảm bảo user được lưu vào database.
        await newUser.save();

        // Thay đổi: Gọi `res.status` trực tiếp thay vì trả về Response.
        res.status(201).json({
            message: "User created",
            status: true,
            data: { _id: newUser._id, email: newUser.email },
        });
    } catch (error) {
        // Thay đổi: Thêm `console.error` để ghi lại lỗi khi debug.
        console.error("Error in register:", error);

        // Thay đổi: Gọi `res.status` trực tiếp thay vì trả về Response.
        res.status(500).json({ message: "Server Error" });
    }
    
};

const login = async(req: Request, res: Response, next: NextFunction)=>{
    const {email, password} = req.body
    if(!email|| !password){
        res.status(400).json({error: 'Cac o khong duoc bo trong'});
        return;
   }
   const userFound = await UserSchema.findOne({email})

   if(!userFound){
        res.status(400).json({error: ' Email da ton tai'})
        return;
   }
   const isPasswordHashed = await bcrypt.compare(password, userFound.password)
   if(!isPasswordHashed){
        res.status(400).json({error: 'Loi bao mat tai khoan'});
        return;
   }
    try {
          
          
                    const token = sign({sub: userFound._id}, config.jwtSecret as string, {expiresIn: '1d'});
                     res.status(200).json({
                        message: 'Login success',
                        status: true,
                        data: {_id: userFound._id, email: userFound.email,role: userFound.role},
                        
                        token,
                    })    

    } catch (error) {
        console.error("Error in login:", error);

        // Thay đổi: Gọi `res.status` trực tiếp thay vì trả về Response.
        res.status(500).json({ message: "Server Error" });
        
    }
};

const me = async(req: Request, res: Response, next: NextFunction)=>{
    const _request = req as AuthReuest;
    const user = await UserSchema.findById(_request.userId);
    if(user){
        res.status(200).json({
            status: true,
            message: 'User found',
            data:{_id: user._id, email: user.email, name: user.name, role: user.role}
        })
        return;
    }
    if(!user){
        res.status(404).json({
            status: false,
            message: 'User not found'
        })
        return;
    }
    
};
const getAllUsers = async(req: Request, res: Response, next: NextFunction)=>{
 
    try {
        
        const users = await UserSchema.find({role: "user"}).select('-password');
        res.status(200).json({
            status: true,
            message: 'List of all users',
            data: users,
        })
    } catch (error) {
        console.error("Error in get all users:", error);
        next(createHttpError(500, 'Failed to fetch user'));
        
    }


    }
    // const hasUser = async(req: Request, res: Response, next: NextFunction)=>{
    //     const user = await UserSchema.find();
    // }

const addNewUser = async(req: Request, res: Response, next: NextFunction)=>{
    try {

        const {name, email, password, role} = req.body;
        if(!name || !email || !password || !role){
            res.status(400).json({message: 'Please fill all fields'});
            return;
        }
        const userExist = await UserSchema.findOne({email});
        if(userExist){
            res.status(400).json({message: 'Email already exists'});
            return;
        }
        const user = await UserSchema.create(req.body);
        res.status(201).json({
            status: true,
            message: 'Added new user',
            data: user,
        })
        
    } catch (error) {
        console.error("Error to add new user", error);
        next(createHttpError(500, 'Failed to fetch user'));
        
    }
}
   
export  {
    //admin api
    addNewUser,
    getAllUsers,
    register,
    login,
    me
}