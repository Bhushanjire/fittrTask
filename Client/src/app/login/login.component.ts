import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { apiResponce } from '../constant';
import { LoaderService } from '../services/loader.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  message: string;
  constructor(
    private router: Router,
    private apiService: ApiService,
    private loaderService: LoaderService,
    private toastr: ToastrService
  ) {
    this.loginForm = new FormGroup({
      emailId: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    })

  }

  ngOnInit() {
  }

  login() {
    if (this.loginForm.valid) {
      this.loaderService.show();
      try {
        this.apiService.login(this.loginForm.value).subscribe((responce: apiResponce) => {
          let data = responce.data;
          this.loaderService.hide();
          this.message = responce.message as string;
          if (responce.isSuccess) {
            this.toastr.success(this.message, 'Alert');
            if (data.roleId == 1) {
              this.router.navigate(['/dashboard/admin']);
            } else {
              this.router.navigate(['/dashboard/customer']);
            }
            localStorage.setItem('fittr', JSON.stringify(responce.data))

          } else {
            this.toastr.error(this.message, 'Alert');
          }
        })
      } catch (error) {
        this.loaderService.hide();
        console.log('Error', error);
      }
    }
  }

}
