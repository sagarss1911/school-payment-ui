import { Component, OnInit, ViewChild,PLATFORM_ID ,Inject} from '@angular/core';
import { GetTextService } from 'src/app/services/getText.service';
import { CommonHelper } from 'src/app/helpers/common.helper';
import { ToastMessageService } from 'src/app/services/toast-message.service';
import { RecaptchaComponent } from 'ng-recaptcha'
import { BilldeskService } from 'src/app/services/billdesk.service';
import {  Router,ActivatedRoute } from '@angular/router';
declare var bdPayment: any;
import { environment } from "../../environments/environment";
@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.component.html',
  styleUrls: ['./payment-success.component.css'],
})
export class PaymentSuccessComponent implements OnInit {

  loading: boolean = false;
  transaction_id:string ="";
  transaction_details:any
  @ViewChild('captchaRef') captchaRef: RecaptchaComponent;
  constructor(
    private getTextService: GetTextService,
    private billdeskService: BilldeskService,
    private router : Router,
    private commonHelper: CommonHelper,
    private _toastMessageService: ToastMessageService,
    private activatedRoute: ActivatedRoute
  ) {
  }
  goBackHome(){
    this.router.navigate(['/']);

  }
  ngOnInit(): void {


  }

}



