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

export interface FlagFormvalue {
    report: string,
    reason?: string
}

export interface CommentFormValue {
    userid: string,
    postid: string,
    content: string
}
export interface UserProfile {
    name: string;
    pronouns?: string; // Optional property
    gender?: string; // Optional property
    bio?: string; // Optional property
    location?: string; // Optional property
    profileImage?: string | null; // You can set a default value of null for the profile image
}

export interface Languages {
    english: boolean;
    malayalam: boolean;
    hinglish: boolean;
    otherLanguage: boolean;
    customlanguageValue: string;
}
export interface IdealClient {
    students: boolean,
    youngAdults: boolean,
    workingProfessionals: boolean,
    teenagers: boolean,
    jobAspirants: boolean,
    marriedCouples: boolean,
    parents: boolean,
    other: boolean,
    customclientValue: string | null
}

export interface Expertise {
    life: boolean,
    positivity: boolean,
    relationships: boolean,
    career: boolean,
    mindset: boolean,
    family: boolean,
};


export interface Message {
    sender: string;
    receiver: string;
    text: string;
    senderType: string;
    receiverType: string;
    receiverId: string;
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