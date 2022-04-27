import { Component, OnInit, ViewChild } from '@angular/core';
import { GetTextService } from 'src/app/services/getText.service';
import { CommonHelper } from 'src/app/helpers/common.helper';
import { ToastMessageService } from 'src/app/services/toast-message.service';
import {RecaptchaComponent} from 'ng-recaptcha'
import { ChangeDetectorRef } from '@angular/core';
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
  captcha = { validated:false}
  info_obj: any = [];
  info_Detail: any = []
  selected_Fees: any = []
  isMasterSel = false;
  checkedCategoryList:any
  selectedTotalPayment = 0

  @ViewChild('captchaRef') captchaRef: RecaptchaComponent;
  constructor(
    private getTextService: GetTextService,
    private commonHelper: CommonHelper,
    private _toastMessageService: ToastMessageService
  ) {
   }

  ngOnInit(): void {
  }
  sendOTP() {

    this.captchaRef.reset();
    this.captcha.validated = false;
    this.getInfo();

  }
  resolved(e){
    this.captcha.validated = true;
  }
  errorCaptcha(e){
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
    this.isMasterSel = this.info_Detail.feesSummary.every(function(item:any) {
        return item.isSelected == true;      })

    this.getCheckedItemList();
  }
  getCheckedItemList(){
    this.checkedCategoryList = [];
    for (var i = 0; i < this.info_Detail.feesSummary.length; i++) {
      if(this.info_Detail.feesSummary[i].isSelected)
      this.checkedCategoryList.push(this.info_Detail.feesSummary[i]);
    }
    this.checkedCategoryList = this.checkedCategoryList.filter(f=>f.unpaid == 1)
    this.checkedCategoryList  = this.checkedCategoryList.map(c=>c.feeDate)

    this.selectedTotalPayment = 0
    for (var i = 0; i < this.checkedCategoryList.length; i++) {
     let fees  = this.info_Detail.feesSummary.filter(f=>f.feeDate == this.checkedCategoryList[i])[0]
     this.selectedTotalPayment += Number(fees.feesAmount) +  Number(fees.penalty)
    }

  }
  initiatePayment(){
    let params = {
      stu_dr_no: this.info_obj.stu_dr_no,
      selected_months: this.checkedCategoryList,
      toal_payment:this.selectedTotalPayment
    }
    this.loading = true;
    this.getTextService.processPayment(params).subscribe((res: any) => {
      this.loading = false;
      if (res.status == 200 && res.data) {


      }
    }, (error) => {
      this.loading = false;
      this.commonHelper.showError(error);
    })
  }
  getInfo() {
    let params = {
      stu_dr_no: this.info_obj.stu_dr_no
    }
    this.loading = true;
    this.getTextService.getText(params).subscribe((res: any) => {
      this.loading = false;
      if (res.status == 200 && res.data) {
        this.showOtpBox = false;
        this.showTable = true;
        this.info_Detail = JSON.parse(JSON.stringify(res.data));
      }
    }, (error) => {
      this.loading = false;
      this.commonHelper.showError(error);
    })
  }


  }



