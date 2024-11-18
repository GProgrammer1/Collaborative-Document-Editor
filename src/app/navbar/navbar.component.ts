import { Component, OnInit } from '@angular/core';
import { EditorComponent } from '../editor/editor.component';
import {  MatFormFieldModule } from '@angular/material/form-field';
import {MatToolbarModule} from '@angular/material/toolbar'
import {MatIconModule} from '@angular/material/icon'
import {MatSelectModule} from '@angular/material/select'
import {  Observable} from 'rxjs';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { Document } from '../models/model';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { AddDocumentComponent } from '../add-document/add-document.component';
import { CommunicatorService } from '../communicator.service';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [EditorComponent, MatFormFieldModule, MatToolbarModule, MatIconModule,
     MatSelectModule, AsyncPipe, JsonPipe, FormsModule, MatButtonModule, MatDialogModule,
    AddDocumentComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  
  documentsList$! : Observable<Document[]> ;
  selectedDocument: string = ''; 
  displayedDocument$! : Observable<Document> ;
  constructor(
    private service : CommunicatorService,
    private dialog : MatDialog,
  ){
      
    
  }

  openDoc() {
    console.log(this.selectedDocument);
    
    this.service.openDoc(this.selectedDocument) ;
  }

  ngOnInit(): void {
    this.documentsList$ = this.service.documents$ ;
    this.service.documentDisplayed$ = this.displayedDocument$ ;    
  }

  openDialog() {
    this.dialog.open(AddDocumentComponent) ;

  }

  onDelete() {
    this.service.delete(this.selectedDocument) ;
  }

  save() { 
    this.service.save(this.selectedDocument) ;
  }


}
