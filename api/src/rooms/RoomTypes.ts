export interface Room {
    _id: string;
    roomname : string;
    description: string;
    price: number;
    capacity: number;
    isBooked: boolean;
    image: string;
    createdAt: Date;
    updatedAt: Date;
}