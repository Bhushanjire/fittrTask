import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { apiResponce } from '../constant';
import { constant } from '../constant'
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoaderService } from '../services/loader.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-promocode',
  templateUrl: './promocode.component.html',
  styleUrls: ['./promocode.component.scss']
})
export class PromocodeComponent implements OnInit {
  promoCodeList: [];
  promocodeForm: FormGroup;
  message: string;
  currentDate: any;

  constructor(
    private router: Router,
    private apiService: ApiService,
    private loaderService: LoaderService,
    private toastr: ToastrService

  ) {

    this.promocodeForm = new FormGroup({
      age: new FormControl(null, [Validators.required]),
      region: new FormControl(null, [Validators.required]),
      gender: new FormControl(null, [Validators.required]),
      startDate: new FormControl(null, [Validators.required]),
      endDate: new FormControl(null, [Validators.required]),
      discount: new FormControl(null, [Validators.required]),
    })

  }

  ngOnInit() {
    this.getAllPromoCode();
    this.currentDate = new Date().getFullYear() + "-" + ("0" + (new Date().getMonth() + 1)).slice(-2) + "-" + ("0" + new Date().getDate()).slice(-2);
  }


  getAllPromoCode() {
    try {
      this.loaderService.show();
      this.apiService.getAllPromoCode().subscribe((responce: apiResponce) => {
        this.promoCodeList = responce.data;
        this.loaderService.hide();
      })
    } catch (error) {
      this.loaderService.hide();
    }

  }

  createPromocode() {

    this.promocodeForm.markAllAsTouched();

    try {
      if (this.promocodeForm.valid) {
        this.loaderService.show();
        this.apiService.createPromoCode(this.promocodeForm.value).subscribe((responce: apiResponce) => {
          this.loaderService.hide();
          this.message = responce.message as string;
          if (responce.isSuccess) {
            this.toastr.success(this.message, 'Alert');
            this.getAllPromoCode();
          } else {
            this.toastr.error(this.message, 'Alert');
          }
        });
      } else {
        this.toastr.error('Please enter all data', 'Alert');
      }
    } catch (error) {
      this.loaderService.hide();
    }
  }

  action(codeId, status) {
    let postData = {
      codeId: codeId,
      status: (status == 'Active') ? 'Inactive' : 'Active'
    }
    this.loaderService.show();
    this.apiService.updatePromocode(postData).subscribe((responce: apiResponce) => {
      this.loaderService.hide();
      this.message = responce.message as string;
      if (responce.isSuccess) {
        this.toastr.success(this.message, 'Alert')
        this.getAllPromoCode();
      } else {
        this.toastr.error(this.message, 'Alert')
      }
    })
  }

}
