import { Component, OnInit } from '@angular/core';
import { LoaderService } from './services/loader.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  loginUser = {}

  constructor(
    private loaderService: LoaderService,
    private router: Router
    ) {

  }
  loader: boolean = false;
  ngOnInit() {
    this.loaderService.loaderStatus.subscribe((status) => {
      this.loader = status
    })
    this.loginUser = JSON.parse(localStorage.getItem('fittr'));
    if (this.loginUser) {
      if (this.loginUser['roleId'] == 1) {
        this.router.navigate(['/dashboard/admin'])
      } else {
        this.router.navigate(['/dashboard/customer'])
      }
    } else {
      this.router.navigate(['/login'])
    }
  }

}
