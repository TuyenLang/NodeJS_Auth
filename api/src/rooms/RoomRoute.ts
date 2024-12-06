import { Router } from 'express';
import { getAllRooms,getRoomById,deleteRoombyID,updateRoom,addNewRoom } from './RoomController';
import authenticate from '../middlewares/authenticate';

const roomRouter = Router();

roomRouter.get('/allrooms',authenticate, getAllRooms);
roomRouter.get('/:id',authenticate, getRoomById);
roomRouter.delete('/:id',authenticate, deleteRoombyID);
roomRouter.put('/:id',authenticate, updateRoom);
roomRouter.post('/addnewroom',authenticate, addNewRoom);

export {roomRouter};;