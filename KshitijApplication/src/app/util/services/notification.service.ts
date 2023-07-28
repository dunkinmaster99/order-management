import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private toastr: ToastrService) { }
  showSuccess(message: any, title: any) {
    this.toastr.success(message, title)
  }
  showError(message: any, title: any) {
    this.toastr.error(message, title)
  }
  showInfo(message: any, title: any) {
    this.toastr.info(message, title)
  }
  showWarning(message: any, title: any) {
    this.toastr.warning(message, title)
  }

  handleError(error: any) {
    if (error instanceof HttpErrorResponse) {
      // Server error
      switch (error.status) {
        case 500:
          this.toastr.error("", "Internal server error occured")
          break;
        case 401:
          this.toastr.error("", "Unauthorized request")
          break;
        case 400:
          this.toastr.error("", "Bad Request")
          break;
        default:
          this.toastr.error("", "Network Failure")
          break;
      }
    } else {
      //Client error
      this.toastr.error(error.message, "Client error")
    }
  }

}