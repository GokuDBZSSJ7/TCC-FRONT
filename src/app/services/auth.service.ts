import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, of, tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
  ) { }

  apiUrl = "http://127.0.0.1:8000/api"

  login(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/login`, data);
  }

  refresh(): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/refresh`, {});
  }

  me(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/auth/me`, {});
  }

  forgotPassword(data: any) {
    return this.http.post<any>(`${this.apiUrl}/auth/forgot-password`, data);
  }

  logout(): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/logout`, {});
  }

  setUser(): Observable<any> {
    return this.me().pipe(
      tap(user => localStorage.setItem('user', JSON.stringify(user))),
      catchError(() => of(null))
    );
  }

  getUser() {
    const userString = localStorage.getItem('user');
    return userString ? JSON.parse(userString) : null;
  }

  setToken(token: any, rememberMe: boolean) {
    const jwt: any = jwtDecode(token.access_token)
    const expires = new Date(jwt['exp'] * 1000);
    token = { ...token, expires, rememberMe };
    if (rememberMe) {
      localStorage.setItem('authToken', JSON.stringify(token));
    } else {
      localStorage.setItem('authToken', JSON.stringify(token));
    }
  }

  destroyToken() {
    localStorage.removeItem('authToken');
  }

  removeUserInfo() {
    localStorage.removeItem('user');
  }
}