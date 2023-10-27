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
import { ModalComponent } from './component/common/modal/modal.component';
import { SharedModule } from './shared/shared.module';
import { PickerModule } from '@ctrl/ngx-emoji-mart';









const config: SocketIoConfig = { url: `${environment.api}`, options: {} };





@NgModule({
  declarations: [
    AppComponent,
    ModalComponent,












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



  ], exports: [PickerModule],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: HttpInterceptorInterceptor,
    multi: true
  }, UserServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
