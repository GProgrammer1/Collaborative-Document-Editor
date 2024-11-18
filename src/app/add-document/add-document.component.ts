import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DocumentService } from '../document.service';
import {  Document } from '../models/model';
import {  MatDialogRef } from '@angular/material/dialog';
import { HttpResponse } from '../models/model';
import { CommunicatorService } from '../communicator.service';

@Component({
  selector: 'app-add-document',
  standalone: true,
  imports: [MatFormFieldModule, MatLabel, MatInputModule, ReactiveFormsModule],
  templateUrl: './add-document.component.html',
  styleUrl: './add-document.component.css'
})
export class AddDocumentComponent {
  addDocument = new FormGroup({
    filename : new FormControl<string>('', [ Validators.required]) 
  }) ;

  constructor(private docService: DocumentService, 
    private  service : CommunicatorService,
    private dialogRef : MatDialogRef<AddDocumentComponent>
    
  ){}

  addDoc() { 
    if (this.addDocument.invalid) {
      console.log('a');
      
      return ; 
    }
    const filename : string = this.addDocument.get('filename')?.value! ;
    console.log(filename);
    
    const file : File = new File(['dummy content'],filename, {type: 'text/plain'}) ; 
    const formData = new FormData();
    formData.append('file', file) ; 

    console.log(file);
    
    
    this.docService.addDocument(formData).subscribe(
      {
      next: 
        (response : HttpResponse<{document: Document}>) => {
            const document : Document = response.data.document ;
            this.service.documentListSubject.next([...this.service.documentListSubject.value, document]) ;
  
      },
      error :
        (err)=> {
           console.error('Error: ', err);
           
        }
      }
    )
    this.dialogRef.close() ;
  }

  
}
