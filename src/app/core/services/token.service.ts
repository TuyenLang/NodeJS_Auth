import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LocalStorage} from '../constants/contants';
@Injectable({
  providedIn: 'root'
})
export class TokenService {
  isAuthentication: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() { }

  updateToken(status: boolean){
    this.isAuthentication.next(status);
  }
  setToken(token: string){
    this.updateToken(true);
    localStorage.setItem(LocalStorage.token, token);
  }
  getToken(){
    
    return localStorage.getItem(LocalStorage.token) || null;
  }
  removeToken(){
    this.updateToken(false);
    return localStorage.removeItem(LocalStorage.token);
  }
  decodeToken(): any {
    const token = this.getToken();
    if (!token) return null;
  
    try {
      const parts = token.split('.');
      const payload = parts[1];
      const decodedPayload = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
      console.log('Decoded payload:', JSON.parse(decodedPayload));
      return JSON.parse(decodedPayload);
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }
}
