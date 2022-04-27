import { Component,OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ToastMessageService } from '../services/toast-message.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-common-helper',
  template: '``'
})

export class CommonHelper {

    constructor(public router:Router,public _toastMessageService: ToastMessageService,
       private sanitizer: DomSanitizer) {
    }

    showError(err) {
        let errorMsg = "internal server error or check your internet connection";
        try {
            if(err.error && err.error.error) {
              errorMsg = err.error.error;
            } else if(err.error && err.error.message) {
              errorMsg = err.error.message;
            }

            this._toastMessageService.alert("error",errorMsg);
        } catch(e) {
          this._toastMessageService.alert("error",errorMsg);
        }
    }

    capitalCase(str) {
      if(!str) {
        return str;
      } else {
        return str[0].toUpperCase() + str.substr(1);
      }
    }
}
