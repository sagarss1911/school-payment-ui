import {
  Component,
  OnInit,
  ViewChild,
  PLATFORM_ID,
  Inject,
} from '@angular/core';
import { GetTextService } from 'src/app/services/getText.service';
import { CommonHelper } from 'src/app/helpers/common.helper';
import { ToastMessageService } from 'src/app/services/toast-message.service';
import { RecaptchaComponent } from 'ng-recaptcha';
import { Router, ActivatedRoute } from '@angular/router';
declare var bdPayment: any;
import { environment } from '../../environments/environment';
@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.component.html',
  styleUrls: ['./payment-success.component.css'],
})
export class PaymentSuccessComponent implements OnInit {
  loading: boolean = false;
  transaction_id: string = '';
  transaction_details: any = {};
  @ViewChild('captchaRef') captchaRef: RecaptchaComponent;
  constructor(
    private getTextService: GetTextService,
    private router: Router,
    private commonHelper: CommonHelper,
    private _toastMessageService: ToastMessageService,
    private activatedRoute: ActivatedRoute
  ) {}
  goBackHome() {
    this.router.navigate(['/']);
  }
  ngOnInit(): void {
    this.transaction_id = this.activatedRoute.snapshot.paramMap.get(
      'transaction_id'
    )
      ? this.activatedRoute.snapshot.paramMap.get('transaction_id')
      : '';
    if (!this.transaction_id) {
      this.router.navigate(['']);
    }
    this.getPaymentDetails();
  }
  getPaymentDetails() {
    let params = {
      transaction_id: this.transaction_id,
    };
    this.loading = true;
    this.getTextService.getTransactionDetails(params).subscribe(
      (res: any) => {
        this.loading = false;
        if (res.status == 200 && res.data) {
          this.transaction_details = res.data;

          if (this.transaction_details.total == 0) {
            this.commonHelper.showError({
              error: { message: 'Invalid Transaction Details' },
            });
          }
        }
      },
      (error) => {
        this.loading = false;
        this.commonHelper.showError(error);
      }
    );
  }
}
