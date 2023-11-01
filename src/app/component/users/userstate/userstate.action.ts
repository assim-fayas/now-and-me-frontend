import { createAction } from "@ngrx/store";
import { props } from "@ngrx/store";
import { Profile } from "./usermodel";


export const retriveprofile = createAction('[profile API] success',)
export const retriveprofileSuccess = createAction('[Profile API]API SuccessSuccess',

    props<{ userdetails: Profile }>()

)