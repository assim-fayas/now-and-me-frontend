import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { retriveprofile, retriveprofileSuccess } from "./userstate.action";
import { map, switchMap } from "rxjs";
import { appUserService } from "./userstate.service";
import { Profile } from "./usermodel";

@Injectable()
export class appEffects {
    constructor(private actions$: Actions, private appService: appUserService) { }
    loadProfile$ = createEffect(() =>
        this.actions$.pipe(
            ofType(retriveprofile),
            switchMap(() => {
                return this.appService.loadProfile()
                    .pipe(map((data) => retriveprofileSuccess({ userdetails: data as Profile })
                    ))
            })
        )
    )
}