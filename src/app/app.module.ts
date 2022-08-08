import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GetInfoComponent } from './get-info/get-info.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { PaymentSuccessComponent } from './payment-success/payment-success.component';
import { PaymentErrorComponent } from './payment-error/payment-error.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CommonHelper } from './helpers/common.helper';
import { DatePipe } from '@angular/common';
import { ToastMessageService } from './services/toast-message.service';
import { ToastMessageComponent } from './toast-message/toast-message.component';
import { RecaptchaModule } from "ng-recaptcha";
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxLoadingModule } from 'ngx-loading';
@NgModule({
  declarations: [
    AppComponent,
    GetInfoComponent,
    CheckoutComponent,
    PaymentSuccessComponent,
    PaymentErrorComponent,
    CommonHelper,
    ToastMessageComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxLoadingModule.forRoot({}),
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RecaptchaModule,
    NgSelectModule
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
