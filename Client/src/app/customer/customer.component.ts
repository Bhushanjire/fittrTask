import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../services/loader.service';
import { ApiService } from '../services/api.service';
import { apiResponce } from '../constant';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {
  promoCodeList = [];
  loginUser = {}
  message : string;
  constructor(
    private apiService: ApiService,
    private loaderService: LoaderService,
    private toastr: ToastrService
  ) { }



  ngOnInit() {
    this.getAllPromoCode();
    this.loginUser = JSON.parse(localStorage.getItem('fittr'));
  }

  apply(codeId) {
    let postData = {
      userId: this.loginUser['userId'],
      promoCodeId: codeId,
      age: this.loginUser['age'],
      gender: this.loginUser['gender'],
      region: this.loginUser['region'],
    }
    this.loaderService.show();
    this.apiService.applyPromoCode(postData).subscribe((responce: apiResponce) => {
      this.loaderService.hide();
      this.message = responce.message as string;
      if(responce.isSuccess){
        this.toastr.success(this.message, 'Alert');
      }else{
        this.toastr.error(this.message, 'Alert');
      }
    });
  }

  getAllPromoCode() {
    try {
      this.loaderService.show();
      this.apiService.getActivePromocode().subscribe((responce: apiResponce) => {
        this.promoCodeList = responce.data;
        this.loaderService.hide();
      })
    } catch (error) {
      this.loaderService.hide();
    }

  }

}
