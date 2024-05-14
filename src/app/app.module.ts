import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpInterceptorInterceptor } from './interceptor/http-interceptor.interceptor';
import { UserServiceService } from './service/user-service.service';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { environment } from 'src/environments/environment';
import { SharedModule } from './shared/shared.module';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { profileReducer } from './component/users/userstate/userstate.reducer';
import { appEffects } from './component/users/userstate/userstate.effects';
import { appUserService } from './component/users/userstate/userstate.service';
import { Error404Component } from './error404/error404.component';
import { ErrorHandlingInterceptor } from './interceptor/error-handling.interceptor';





const config: SocketIoConfig = { url: `${environment.api}`, options: {} };





@NgModule({
  declarations: [
    AppComponent,
    Error404Component,

  ],
  imports: [
    PickerModule,
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SharedModule,
    ToastrModule.forRoot(),
    SocketIoModule.forRoot(config),
    StoreModule.forRoot({ userdetails: profileReducer }),
    EffectsModule.forRoot([appEffects]),



  ], exports: [PickerModule],
  providers: [{
    provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorInterceptor, multi: true
  }, { provide: HTTP_INTERCEPTORS, useClass: ErrorHandlingInterceptor, multi: true }, appUserService, UserServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
