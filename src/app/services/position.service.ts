import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PositionService {
  private apiUrl = 'http://127.0.0.1:8000/api/';

  constructor(private http: HttpClient) { }

  list(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}position`);
  }

  create(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}position`, data)
  }
}
