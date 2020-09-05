import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { constant } from '../constant/';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private httpClient: HttpClient
  ) { }


  createPromoCode(data) {
    return this.httpClient.post(constant.baseUrl + 'promoCode/createPromoCode', data);
  }

  getAllPromoCode() {
    return this.httpClient.get(constant.baseUrl + 'promoCode/getAllPromocode');
  }

  getActivePromocode() {
    return this.httpClient.get(constant.baseUrl + 'promoCode/getActivePromocode');
  }

  

  applyPromoCode(data) {
    return this.httpClient.post(constant.baseUrl + 'promoCode/applyPromoCode',data);
  }

  updatePromocode(data) {
    return this.httpClient.put(constant.baseUrl + 'promoCode/updateStatus', data);
  }

  userById(data) {
    return this.httpClient.post(constant.baseUrl + 'user-by-id', data);
  }

  deleteUser(data) {
    return this.httpClient.post(constant.baseUrl + 'delete-user', data);
  }

  login(data){
    return this.httpClient.post(constant.baseUrl + 'user/login', data);
  }
}
