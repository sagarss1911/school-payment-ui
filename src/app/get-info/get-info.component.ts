import { Component, OnInit, ViewChild,PLATFORM_ID ,Inject} from '@angular/core';
import { GetTextService } from 'src/app/services/getText.service';
import { CommonHelper } from 'src/app/helpers/common.helper';
import { ToastMessageService } from 'src/app/services/toast-message.service';
import { RecaptchaComponent } from 'ng-recaptcha'
import { BilldeskService } from 'src/app/services/billdesk.service';
import {  Router } from '@angular/router';
@Component({
  selector: 'app-get-info',
  templateUrl: './get-info.component.html',
  styleUrls: ['./get-info.component.css'],
})
export class GetInfoComponent implements OnInit {

  loading: boolean = false;
  showTable: boolean = false;
  showOtpBox: boolean = false;
  lockDrNumber: boolean = false;
  captcha = { validated: false }
  info_obj: any = [];
  info_Detail: any = []
  selected_Fees: any = []
  isMasterSel = false;
  checkedCategoryList: any
  selectedTotalPayment = 0
  error = ""
  allFinancialYears = []
  allFinancialBasedonFee = []
  selectedFees
  selectedFinancialYear
  selectedFeesSummary = []
  bdPayment : any;
  feeTypes = [{ id: "A", name: "Arrear Fees" }, { id: "N", name: "Normal Fees" }]
  @ViewChild('captchaRef') captchaRef: RecaptchaComponent;
  constructor(
    private getTextService: GetTextService,
    private billdeskService: BilldeskService,
    private router : Router,
    private commonHelper: CommonHelper,
    private _toastMessageService: ToastMessageService
  ) {
  }

  ngOnInit(): void {

    this.getFinancialYear()
  }
  getFinancialYear() {


    this.loading = true;
    this.getTextService.getFinancialYear().subscribe((res: any) => {
      this.loading = false;
      if (res.status == 200 && res.data) {
        this.allFinancialYears = res.data
      }
    }, (error) => {
      this.loading = false;
      this.error = error
      //this.commonHelper.showError(error);
    })
  }
  onchange(event) {
    this.info_Detail = {}
    if (event) {
      this.selectedFinancialYear = ""
      this.allFinancialBasedonFee = this.allFinancialYears.filter(f => f.type == event.id)
    }
    else{
      this.selectedFees = ""
      this.selectedFinancialYear = ""
    }

  }
  onFinancialchange(event) {
    this.info_Detail = {}
  }
  sendOTP() {
    this.selectedTotalPayment = 0
    this.captchaRef.reset();
    this.captcha.validated = false;
    this.getInfo();

  }
  resolved(e) {
    this.captcha.validated = true;
  }
  errorCaptcha(e) {
    this.captcha.validated = false;
    this.captchaRef.reset()
  }



  checkUncheckAll() {

    for (var i = 0; i < this.info_Detail.feesSummary.length; i++) {
      this.info_Detail.feesSummary[i].isSelected = this.isMasterSel;
    }
    this.getCheckedItemList();
  }

  isAllSelected() {
    this.isMasterSel = this.info_Detail.feesSummary.every(function (item: any) {
      return item.isSelected == true;
    })

    this.getCheckedItemList();
  }
  getCheckedItemList() {
    this.checkedCategoryList = [];
    this.selectedFeesSummary = []
    for (var i = 0; i < this.info_Detail.feesSummary.length; i++) {
      if (this.info_Detail.feesSummary[i].isSelected)
        this.checkedCategoryList.push(this.info_Detail.feesSummary[i]);
    }
    this.checkedCategoryList = this.checkedCategoryList.filter(f => f.unpaid == 1)
    this.selectedFeesSummary = this.checkedCategoryList

    this.checkedCategoryList = this.checkedCategoryList.map(c => c.feeDate)

    this.selectedTotalPayment = 0
    for (var i = 0; i < this.checkedCategoryList.length; i++) {
      let fees = this.info_Detail.feesSummary.filter(f => f.feeDate == this.checkedCategoryList[i])[0]
      this.selectedTotalPayment += Number(fees.feesAmount) + Number(fees.penalty)
    }

  }
  initiatePayment() {
    let params = {
      stu_dr_no: this.info_obj.stu_dr_no,
      selected_months: this.checkedCategoryList,
      toal_payment: this.selectedTotalPayment,
      selectedFees: this.selectedFees,
      selectedFinancialYear: this.selectedFinancialYear
    }
    this.loading = true;
    this.getTextService.processPayment(params).subscribe((res: any) => {
      this.loading = false;
      if (res.status == 200 && res.data) {

        this.router.navigate(['/checkout/'+res.data]);

      }
    }, (error) => {
      this.loading = false;
      this.commonHelper.showError(error);
    })
  }
  getInfo() {
    this.error = ""
    let params = {
      stu_dr_no: this.info_obj.stu_dr_no,
      selectedFees: this.selectedFees,
      selectedFinancialYear: this.selectedFinancialYear
    }
    this.loading = true;
    this.getTextService.getText(params).subscribe((res: any) => {
      this.loading = false;
      if (res.status == 200 && res.data) {
        this.showOtpBox = false;
        this.showTable = true;
        this.info_Detail = JSON.parse(JSON.stringify(res.data));
        if(this.selectedFees == "A"){
          this.checkedCategoryList = this.info_Detail.feesSummary.filter(f => f.unpaid == 1)
          this.checkedCategoryList = this.checkedCategoryList.map(c => c.feeDate)

          this.selectedTotalPayment = 0
          for (var i = 0; i < this.checkedCategoryList.length; i++) {
            let fees = this.info_Detail.feesSummary.filter(f => f.feeDate == this.checkedCategoryList[i])[0]
            this.selectedTotalPayment += Number(fees.feesAmount) + Number(fees.penalty)
          }
        }
      }
    }, (error) => {
      this.loading = false;
      this.error = error
    })
  }


}



