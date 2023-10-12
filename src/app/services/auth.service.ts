import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:3000/api';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    withCredentials: true // Set this to true for cookie-based authentication
  };

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    const body = { email, password };
    return this.http.post(`${this.baseUrl}/auth/login`, body, this.httpOptions);
  }

  register(fullName: string, username: string, email: string, password: string): Observable<any> {
    const body = { username, email, password };
    return this.http.post(`${this.baseUrl}/auth/register`, body, this.httpOptions);
  }

  changePassword(oldPassword: string, newPassword: string): Observable<any> {
    const body = { oldPassword, newPassword };
    return this.http.post(`${this.baseUrl}/auth/change-password`, body, this.httpOptions);
  }

  getAuthenticatedUser(): Observable<any> {
    return this.http.get(`${this.baseUrl}/auth/authenticated-user`, this.httpOptions);
  }

  logout(): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/logout`, null, this.httpOptions);
  }
}
