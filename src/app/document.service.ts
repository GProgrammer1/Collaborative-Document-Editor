import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpResponse } from './models/model';
import { Document } from './models/model';
import { environment } from './environment';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  constructor(private http : HttpClient) { }
  apiUrl = `${environment.host}/document` ;
  getDocument(filename: string) : Observable<HttpResponse<{document : Document}>> {
    return this.http.get<HttpResponse<{document : Document}>>(`${this.apiUrl}/${filename}`)
  }
  
  getDocuments() : Observable<HttpResponse<{documents: Document[]}>> {
    return this.http.get<HttpResponse<{documents: Document[]}>>(`${this.apiUrl}/list`)
  }

  getFile(filename: String) : Observable<HttpResponse<{file : Blob}>> {
    return this.http.get<HttpResponse<{file : Blob}>>(`${this.apiUrl}/file/${filename}`) ;
  }

  addDocument(formData : FormData) : Observable<HttpResponse<{document: Document}>> {
    
    return this.http.post<HttpResponse<{document: Document}>>(`${this.apiUrl}/save`, formData, 
      {headers: new HttpHeaders({ 'Accept': 'application/json' })
      }
    ) ;
  }

  deleteDocument(filename : string) : Observable<HttpResponse<{document: Document}>> {
    return this.http.delete<HttpResponse<{document: Document}>>(`${this.apiUrl}/delete/${filename}`); 
  } 
  
}

