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

export interface User {
    name: string,
    email: string,
    password: string
}


export interface communityPost {
    postAnonymously?: Boolean,
    thoughts: string,
    tags: string[];
}

export interface FlagFormvalue{
    report:string,
    reason?:string
}

export interface CommentFormValue{
    userid:string,
    postid:string,
    content:string
}



export class NotificationMessage {
    message!: string;
    type!: NotificationType
}
export enum NotificationType {
    success = 0,
    warning = 1,
    error = 2,
    info = 3

}