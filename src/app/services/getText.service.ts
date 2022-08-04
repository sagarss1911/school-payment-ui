import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class GetTextService {


  private getTextUrl = environment.url + "/api/v1/get_info/get_info";
  private getTxnDetailsUrl = environment.url + "/api/v1/get_info/get_transaction_details";
  private getCheckSumUrl = environment.url + "/api/v1/get_info/generate_checksum";
  private getCheckSumRetryUrl = environment.url + "/api/v1/get_info/generate_checksum_for_retry";

  private getFinancialYearUrl = environment.url + "/api/v1/get_info/get_financial_year";

  private getOtpUrl = environment.url + "/api/v1/get_info/get_otp";
  private verifyOtpUrl = environment.url + "/api/v1/get_info/verify_otp";
  private processPaymentUrl = environment.url + "/api/v1/get_info/process_payment";

  constructor(private http: HttpClient) { }
  getHeader(): HttpHeaders {
    let headers = new HttpHeaders({ 'x-auth-token': (localStorage.getItem('token') || "") });
    headers = headers.append('x-auth-api-key', environment.key);
    return headers;
  }
  getText(data) {
    return this.http.post(this.getTextUrl, data, { 'headers': this.getHeader() });
  }
  getTransactionDetails(data) {
    return this.http.post(this.getTxnDetailsUrl, data, { 'headers': this.getHeader() });
  }
  getCheckSum(data) {
    return this.http.post(this.getCheckSumUrl, data, { 'headers': this.getHeader() });
  }
  getCheckSumRetry(data) {
    return this.http.post(this.getCheckSumRetryUrl, data, { 'headers': this.getHeader() });
  }

  getFinancialYear(){
    return this.http.get(this.getFinancialYearUrl, { 'headers': this.getHeader() });
  }
  getOtp(data) {
    return this.http.post(this.getOtpUrl, data, { 'headers': this.getHeader() });
  }
  verifyOtp(data) {
    return this.http.post(this.verifyOtpUrl, data, { 'headers': this.getHeader() });
  }
  processPayment(data) {
    return this.http.post(this.processPaymentUrl, data, { 'headers': this.getHeader() });
  }

  billdesk(data,headers) {
    return this.http.post("https://pguat.billdesk.io/payments/ve1_2/orders/create", data,{'headers':headers});
  }
}
