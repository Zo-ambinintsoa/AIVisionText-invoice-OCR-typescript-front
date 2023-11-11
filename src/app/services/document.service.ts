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
  };

  constructor(private http: HttpClient) { }

  listDocuments(keyword: string, page: number, take: number): Observable<any> {
    const params = new HttpParams()
      .set('keyword', keyword)
      .set('page', page.toString())
      .set('take', take.toString());

    return this.http.get(`${this.baseUrl}/documents`, { params });
  }

  searchCategories(name = ''): Observable<{ id: number; name: string }[]> {
    return this.http.get<{ id: number; name: string }[]>(`${this.baseUrl}/document/category/search`, {
      params: { name: name }
    });
  }

  findOneDocument(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/documents/${id}`, this.httpOptions);
  }

  getDashboardCounts(): Observable<any> {
    return this.http.get(`${this.baseUrl}/documents/d`, this.httpOptions);
  }
  uploadDocument(formData: any): Observable<any> {
    const uploadData = new FormData();
    uploadData.append('name', formData.name);
    uploadData.append('category', formData.category);
    uploadData.append('description', formData.description);
    uploadData.append('file', formData.file);

    return this.http.post('http://localhost:3000/api/documents/upload', uploadData);
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
