import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  private baseUrl = 'http://localhost:3000/api';
  private httpOptions = {
    headers: new HttpHeaders({}),
    withCredentials: true // Set this to true for cookie-based authentication
  };

  constructor(private http: HttpClient) { }

  listDocuments(keyword: string, page: number, take: number): Observable<any> {
    const params = new HttpParams()
      .set('keyword', keyword)
      .set('page', page.toString())
      .set('take', take.toString());

    return this.http.get(`${this.baseUrl}/documents`, { params });
  }

  findOneDocument(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/documents/${id}`, this.httpOptions);
  }

  uploadDocument(name: string, description: string, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('file', file);

    return this.http.post(`${this.baseUrl}/documents/upload`, formData, this.httpOptions);
  }

  deleteDocument(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/documents/${id}`, this.httpOptions);
  }

  updateDocument(id: number, updates: any): Observable<any> {
    return this.http.patch(`${this.baseUrl}/documents/${id}`, updates, this.httpOptions);
  }

  downloadFile(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/documents/${id}/download`, {
      ...this.httpOptions,
      responseType: 'blob', // Set the response type to blob for file download
    });
  }
}
