export interface LoginPayLoad{
    eemail: string; 
    password: string;
}

export interface RegisterPayLoad{
    name: string;
    email: string;
    password: string;
}   
export interface User{
    _id: string;
    name: string;
    email: string;
    password: string;
    role?: string;
}   
export interface ApiResponse<T>{
    status?: boolean;
    message?: string; 
    error?: string; 
    token?: string; 
    role?: string;
    data?: T;
}