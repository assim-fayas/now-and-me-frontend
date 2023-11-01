import { createReducer, on } from "@ngrx/store";
import { Profile } from "./usermodel";
import { retriveprofileSuccess } from "./userstate.action";

export const initialStateofUser: Profile = {
    _id: '',
    pronouns: '',
    name: '',
    location: '',
    joined: '',
    image: '',
    gender: '',
    bio: ''
}

const _profileReducer = createReducer(
    initialStateofUser,
    on(retriveprofileSuccess, (state, { userdetails }) => {
        return userdetails
    })
)

export function profileReducer(state: any, action: any) {
    return _profileReducer(state, action);
}