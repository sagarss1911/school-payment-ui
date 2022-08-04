import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GetInfoComponent } from './get-info/get-info.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { PaymentErrorComponent} from './payment-error/payment-error.component';
import { PaymentSuccessComponent } from './payment-success/payment-success.component';

const routes: Routes = [
  {
    path: '', component: GetInfoComponent,
  },
  {
    path: 'checkout/:transaction_id', component: CheckoutComponent
  },
  {
    path: 'error/:transaction_id', component: PaymentErrorComponent
  },
  {
    path: 'thank-you/:transaction_id', component: PaymentSuccessComponent
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
