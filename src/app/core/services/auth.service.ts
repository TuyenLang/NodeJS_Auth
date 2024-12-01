import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse, LoginPayLoad, User } from '../models/common.model';
import { ApiEndpoints,LocalStorage } from '../constants/contants';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _http: HttpClient) { }

  register(){};

  login(payload: LoginPayLoad){
    return this._http.post<ApiResponse<User>>
    (`${ApiEndpoints.Auth.Login}`, payload).pipe((map(response=>{
      if(response.status && response.token){
        localStorage.setItem(LocalStorage.token,response.token);
      }
      return response;
    })));
   
  };

  me(){

       return this._http.get<ApiResponse<User>>
    (`${ApiEndpoints.Auth.Login}`);
  };
}
