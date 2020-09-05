import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  loginUser = {}
  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    this.loginUser = JSON.parse(localStorage.getItem('fittr'));
  }

  logout() {
    localStorage.removeItem('fittr');
    this.router.navigate(['/login']);
  }

}
