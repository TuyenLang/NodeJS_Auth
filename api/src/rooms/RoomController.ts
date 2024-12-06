import { NextFunction,Response,Request } from 'express';

import createHttpError from 'http-errors';
import RoomSchema from './RoomSchema';
import config from '../config/config';
import UserSchema from '../users/UserSchema';


    const addNewRoom = async(req: Request, res: Response, next: NextFunction)=>{
    try {
        const {roomname, capacity, price} = req.body;
        if(!req.body.name || !req.body.capacity || !req.body.price){
            res.status(400).json({message: 'Please fill all fields'});
            return;
        }
        const roomExsit = await RoomSchema.findOne({ roomname });
    
        if(roomExsit){
            res.status(400).json({message: 'Room already exists'});
            return;
        }

        const room = await RoomSchema.create(req.body);

        res.status(201).json({
            status: true,
            message: 'Added new room',
            data: room,
        })
    } catch (error) {
        
    }
        }

    const getAllRooms = async(req: Request, res: Response, next: NextFunction)=>{
    try {
        const room = await RoomSchema.find();
        if(room == null){
            res.status(404).json({message: 'Room null'});
            return;
        }
        res.status(200).json({
            status: true,
            message: 'List of all rooms',
            data: room,
        })
        } catch (error) {
        
    
        }};
    const deleteRoombyID = async(req: Request, res: Response, next: NextFunction)=>{
        try {
            const room = await RoomSchema.findByIdAndDelete(req.params.id);
            if(room == null){
                res.status(404).json({message: 'Room not found'});
                return;
            }
            res.status(200).json({
                status: true,
                message: 'Room deleted',
                data: room,
            })
        } catch (error) {
            
        }}
    const getRoomById = async(req: Request, res: Response, next: NextFunction)=>{
        try {
            const room = await RoomSchema.findById(req.params.id);
            if(room == null){
                res.status(404).json({message: 'Room not found'});
                return;
            }
            res.status(200).json({
                status: true,
                message: 'Room found',
                data: room,
            })
        } catch (error) {
            
        }}
        const updateRoom = async (req: Request, res: Response, next: NextFunction) => {
            try {
                // Tìm phòng theo ID
                const roomExist = await RoomSchema.findById(req.params.id);
                if (!roomExist) {
                     res.status(404).json({ message: 'Room not found' });
                     return;
                }
        
                // Cập nhật phòng
                const updatedRoom = await RoomSchema.findByIdAndUpdate(req.params.id, req.body, { 
                    new: true, // Trả về dữ liệu sau khi cập nhật
                    runValidators: true // Đảm bảo kiểm tra validate trên schema
                });
        
                res.status(200).json({
                    status: true,
                    message: 'Room updated',
                    data: updatedRoom,
                });
            } catch (error) {
                console.error(error);
                res.status(500).json({ 
                    message: 'Internal Server Error', 
                   
                });
            }
        };
    export  {
        addNewRoom,
        getAllRooms,
        getRoomById,
        deleteRoombyID,
        updateRoom,
    }
      