import { Component, OnInit, ViewChild,PLATFORM_ID ,Inject} from '@angular/core';
import { GetTextService } from 'src/app/services/getText.service';
import { CommonHelper } from 'src/app/helpers/common.helper';
import { ToastMessageService } from 'src/app/services/toast-message.service';
import { RecaptchaComponent } from 'ng-recaptcha'
import {  Router,ActivatedRoute } from '@angular/router';
declare var bdPayment: any;
import { environment } from "../../environments/environment";
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {

  loading: boolean = false;
  transaction_id:string ="";
  transaction_details:any
  @ViewChild('captchaRef') captchaRef: RecaptchaComponent;
  constructor(
    private getTextService: GetTextService,
    private router : Router,
    private commonHelper: CommonHelper,
    private _toastMessageService: ToastMessageService,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.transaction_id = this.activatedRoute.snapshot.paramMap.get('transaction_id') ? this.activatedRoute.snapshot.paramMap.get('transaction_id') : "";

    if(!this.transaction_id)
    {
      this.router.navigate(['']);
    }
    //this.getTest();
   this.getPaymentDetails()

  }
  getPaymentDetails() {
    let params = {
      transaction_id:this.transaction_id
    }
    this.loading = true;
    this.getTextService.getTransactionDetails(params).subscribe((res: any) => {
      this.loading = false;
      if (res.status == 200 && res.data) {
  this.transaction_details =res.data
      }
    }, (error) => {
      this.loading = false;
      this.commonHelper.showError(error);
    })
  }

  payNow(){
    let params = {
      transaction_id:this.transaction_id,
      parent_name:this.transaction_details.parent_name,
      parent_mobile:this.transaction_details.parent_mobile_no,
      parent_email:this.transaction_details.parent_email
    }
    this.loading = true;
    this.getTextService.getCheckSum(params).subscribe((res: any) => {
      this.loading = false;
      if (res.status == 200 && res.data) {

  bdPayment.initialize ({
    "msg":res.data,
    "options": {
    "enableChildWindowPosting": true,
    "enablePaymentRetry": true,
    "retry_attempt_count": 2
    },
    "callbackUrl": environment.url+'/payment_status'
    });
      }
    }, (error) => {
      this.loading = false;
      this.commonHelper.showError(error);
    })
  }
}



