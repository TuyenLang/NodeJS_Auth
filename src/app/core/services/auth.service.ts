import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, signal } from '@angular/core';
import { ApiResponse, LoginPayLoad, RegisterPayLoad, User } from '../models/common.model';
import { ApiEndpoints,LocalStorage } from '../constants/contants';
import { catchError, map, Observable, of, single } from 'rxjs';
import { Router } from '@angular/router';
import { TokenService } from './token.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = signal<boolean>(false);
  router = Inject(Router);
  user!: User;
  dataAuth: any;
  currentUser?: User;
  constructor(private _http: HttpClient, private tokenService: TokenService) {
    if(this.getUserToken() ){
      this.isLoggedIn.update(() => true);
    } // neu User da dang nhap thi isLoggedIn = true nghia la ko can dang nhap lai
   
  
  }

  register(payload: RegisterPayLoad){

    return this._http.post<ApiResponse<User>>(
      `${ApiEndpoints.Auth.Register}`, payload)
    

    
  };

  login  (payload: LoginPayLoad){
    return this._http.post<ApiResponse<User>>
    (`${ApiEndpoints.Auth.Login}`, payload).pipe((map(response=>{
      if(response.status && response.token){
        localStorage.setItem(LocalStorage.token,response.token);
        this.isLoggedIn.update(() => true);
        // this.user = this.getUserToken(response.token);
      }
    
 
      return response;
    })));
   
  };


  

 
  logout(){
    localStorage.removeItem(LocalStorage.token);
    this.isLoggedIn.update(() => false);
     this.router.navigate(['login']);
     
   }
   getUserToken() {
    return localStorage.getItem(LocalStorage.token);
   }
  me(){

       return this._http.get<ApiResponse<User>>
    (`${ApiEndpoints.Auth.Me}`);
  };


  getUser(): Observable<User | null> {
    return this.me().pipe(
      map((response) => {
        if (response.data) {
          this.currentUser = response.data;
          return this.currentUser;
        }
        return null;
      }),
      catchError(() => {
        this.currentUser = undefined;
        return of(null); // Xử lý lỗi
      })
    );
  }

  hasRole(role: string): boolean {
    return this.currentUser && this.currentUser.role ? this.currentUser.role.includes(role) : false;
  }
  private decodeJwt(token: string): any {
    try {
      const payload = token.split('.')[1];
      return JSON.parse(atob(payload));
    } catch (e) {
      console.error('Invalid token format:', e);
      return null;
    }
  }
  
  
}

