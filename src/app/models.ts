// export interface LoginRequest {
//     email:String,
//     password:string
// }

export interface LoginResponse {
    token: string,

}



export interface AdminLoginResponse {
    token: string,

}



export interface ExpertLoginResponse {
    token: string,
}

export interface User{
    name:string,
    email:string,
    password:string
}

export class NotificationMessage{
    message!:string;
    type!:NotificationType
}
export enum NotificationType{
    success=0,
    warning=1,
    error=2,
    info=3
    
}