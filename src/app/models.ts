export interface LoginRequest {
    email:String,
    password:string
}

export interface LoginResponse{
    token:string,
    user:{
        id:number;
        name:string
    }
}