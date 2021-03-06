import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from "./../../../environments/environment"
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient:HttpClient, private _authService: AuthService) { }

  getUsers(searchInput: string = '') {
    const httpHeaders = new HttpHeaders({
      Authorization: this._authService.get()
    });

    const url = `${environment.apiUrl}users?q=${searchInput}`;

    return this.httpClient.get(url, {
      headers: httpHeaders
    });
  }

  getUserInfo(id:string):Promise<any> {
    const url = `${environment.apiUrl}users/getProfileInfo`;
    const httpHeaders = new HttpHeaders({
      Authorization: this._authService.get()
    });

    return this.httpClient.get(url, {
      headers: httpHeaders
    }).toPromise();
  }

  changePassword(obj):Promise<any> {
    const httpHeaders = new HttpHeaders({
      Authorization: this._authService.get()
    });
    const url = `${environment.apiUrl}users/changePassword`;
    return this.httpClient.post(url, obj, {
      headers: httpHeaders
    }).toPromise();
  }

  changePhoto(data: any) {
    const url = `${environment.apiUrl}users/profile-pic`;
    const httpHeaders = new HttpHeaders({
      Authorization: this._authService.get()
    });
    return this.httpClient.put(url, data, {
      headers: httpHeaders
    });
  }


  changeName(newName):Promise<any>{
    const url = `${environment.apiUrl}users/changeName`
    const httpHeaders = new HttpHeaders({
      Authorization: this._authService.get()
    });
    return this.httpClient.put(url, {newName: newName}, {
      headers: httpHeaders,
      reportProgress: true
    }).toPromise();
  }

  deleteUser() {
    const httpHeaders = new HttpHeaders({
      Authorization: this._authService.get()
    });

    const url = `${environment.apiUrl}users/`;

    return this.httpClient.delete(url, {
      headers: httpHeaders
    });
  }

}
