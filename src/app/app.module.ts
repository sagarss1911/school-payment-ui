import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GetInfoComponent } from './get-info/get-info.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CommonHelper } from './helpers/common.helper';
import { DatePipe } from '@angular/common';
import { ToastMessageService } from './services/toast-message.service';
import { ToastMessageComponent } from './toast-message/toast-message.component';
import { RecaptchaModule } from "ng-recaptcha";
@NgModule({
  declarations: [
    AppComponent,
    GetInfoComponent,

    CommonHelper,
    ToastMessageComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RecaptchaModule
  ],
  exports: [],
  providers: [
    CommonHelper,

    DatePipe,
    ToastMessageService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
