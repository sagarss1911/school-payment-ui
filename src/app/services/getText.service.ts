import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class GetTextService {


  private getTextUrl = environment.url + "/api/v1/get_info/get_info";
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
  getOtp(data) {
    return this.http.post(this.getOtpUrl, data, { 'headers': this.getHeader() });
  }
  verifyOtp(data) {
    return this.http.post(this.verifyOtpUrl, data, { 'headers': this.getHeader() });
  }
  processPayment(data) {
    return this.http.post(this.processPaymentUrl, data, { 'headers': this.getHeader() });
  }
}
