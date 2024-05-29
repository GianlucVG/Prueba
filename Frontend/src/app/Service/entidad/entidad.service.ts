import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EntidadService {
  private apiUrl = 'http://localhost:3000/api/entidad';

  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http.get(this.apiUrl, { headers: { 'x-access-token': localStorage.getItem('token') || '' } });
  }

  create(entidad: any): Observable<any> {
    return this.http.post(this.apiUrl, entidad, { headers: { 'x-access-token': localStorage.getItem('token') || '' } });
  }

  update(id: number, entidad: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, entidad, { headers: { 'x-access-token': localStorage.getItem('token') || '' } });
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { headers: { 'x-access-token': localStorage.getItem('token') || '' } });
  }
}