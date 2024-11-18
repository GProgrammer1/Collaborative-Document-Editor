import { Injectable } from '@angular/core';
import { BehaviorSubject} from 'rxjs';
import { DocumentService } from './document.service';
import { Document, HttpResponse } from './models/model';

@Injectable({
  providedIn: 'root'
})
export class CommunicatorService {

  
  documentListSubject = new BehaviorSubject<Document[]>([]) ;
  documents$ = this.documentListSubject.asObservable(); 
  documentSelectedSubject = new BehaviorSubject<Document>({} as Document) ;
  documentDisplayed$ = this.documentSelectedSubject.asObservable(); 

  fileContentSubject = new BehaviorSubject<string>('' ); 
  fileContent$ = this.fileContentSubject.asObservable();

  constructor(private docService : DocumentService) {
    this.loadDocuments(); 
  }

  loadDocuments() {
    this.docService.getDocuments().subscribe(
      {
        next: 
        (response : HttpResponse<{documents: Document[]}>)=>{
          const documents : Document[] = response.data.documents ;
          this.documentListSubject.next(documents) ;
        },
        error : (err)=> {
          console.error('Error: ', err);
          
        }
      }
    )
  }

  openDoc(filename: string) {   
    this.getFile(filename); 
  }

  getFile(filename: string){
    this.docService.getFile(filename).subscribe(
      {
        next: 
          (response : HttpResponse<{file: Blob}>)=> {
            const file : Blob = response.data.file ;
            const content : string = this.uint8ArrayToString(this.uint8ArrayFromString(file as unknown as string)) ;
            console.log(content);
            this.fileContentSubject.next(content) ;           
          },
          error: (err) => {
            console.error('Error :', err);
            
          }
      }
    )
  }

  uint8ArrayToString(uint8Array: Uint8Array): string {
    return new TextDecoder().decode(uint8Array);
  }

  uint8ArrayFromString(base64String: string): Uint8Array {
    const binaryString = atob(base64String);
    const len = binaryString.length ;
    const bytes = new Uint8Array(len) ;
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes ;
  }

  delete(filename: string) {
    this.docService.deleteDocument(filename).subscribe(
      {
        next: 
        (response: HttpResponse<{document: Document}>)=> {
          const documentDeleted : Document = response.data.document ;
          this.documentListSubject.next(this.documentListSubject
            .value
            .filter(document => document.filename !== documentDeleted.filename )) ;
        },
        error: (err)=>{
          console.error('Error: ', err);
          
        }
      }
    )
  }
  
  updateDocumentContent(content: string) {
    this.fileContentSubject.next(content); 
  }

  save(filename: string) {
    const file : File = new File([this.fileContentSubject.value], filename) ;
    console.log(file);
    
    const formData = new FormData();
    formData.append('file', file);
    this.docService.addDocument(formData); 
  }

  getDocument(filename: string) {
    this.docService.getDocument(filename).subscribe(
      {
        next: response => {
          const doc : Document = response.data.document ;
          this.documentSelectedSubject.next(doc); 
        },
        error: err => {
          console.error("Error: ", err);         
        }
      }
    )
  }
}
