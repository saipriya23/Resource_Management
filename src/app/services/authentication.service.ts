import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Login } from '../login';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  static readonly loginUrl="http://localhost:62152/api/Login";
  
  constructor(private http:HttpClient) { }

  public login(userName: Login): Observable<Boolean> {
    return this.http.post<Boolean>(AuthenticationService.loginUrl, userName);
  }
  
}
