import mongoose from "mongoose";
import { Room } from "./RoomTypes";


 const  RoomSchema = new mongoose.Schema<Room>({
    roomname: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    capacity: {
        type: Number,
        required: true
    },
    isBooked: {
        type: Boolean,
        required: true
    },
    image: {
        type: String,
        required: true
    }
},
{timestamps: true},

);

export default mongoose.model<Room>('Room', RoomSchema);