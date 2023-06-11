import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token: string = '';

  constructor(private http: HttpClient) { }

  getToken(user: string, password: string): Observable<any> {
    const url = 'https://lab.app.invertebrado.co/api/account/login';
    const datos = {
      UserName: user,
      Password: password
    };
    return this.http.post<any>(url, datos) 
  }

}