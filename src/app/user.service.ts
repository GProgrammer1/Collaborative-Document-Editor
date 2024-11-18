import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from './environment';


export interface User {
  firstname: string ;
  lastname: string ;
  email: string ;
  password: string
}
@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl = `${environment.host}/auth` ;
  
  constructor(private http : HttpClient) { }

  authenticate(credentials: {email:string , password: string}) : Observable<{token: string}> {
    return this.http.post<{token: string}>(`${this.apiUrl}/authenticate`, credentials) ;
  }
  register(user : User) : Observable<{token: string}> {
    return this.http.post<{token: string}>(`${this.apiUrl}/register`, user) ;
  }
}
