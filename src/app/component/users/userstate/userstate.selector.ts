import { createSelector } from "@ngrx/store";
import { UserProfile } from "./userstate.state";
import { Profile } from "./usermodel";

export const profileRootSelector = (state: UserProfile) => state.userdetails;
export const userprofile = createSelector(
    profileRootSelector,
    (userdetails: Profile) => {
        return userdetails
    }
)