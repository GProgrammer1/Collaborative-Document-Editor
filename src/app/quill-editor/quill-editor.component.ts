import { Component, AfterViewInit, OnDestroy, ViewChild, ElementRef, OnInit } from '@angular/core';
import Quill from 'quill';
import { Observable, Subscription } from 'rxjs';
import { CommunicatorService } from '../communicator.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Document } from '../models/model';
import { WebSocketService } from '../web-socket.service';

@Component({
  selector: 'app-quill-editor',
  standalone: true,
  templateUrl: './quill-editor.component.html',
  styleUrls: ['./quill-editor.component.css'],
  imports: [MatIconModule, MatButtonModule],
  providers: [WebSocketService]
})
export class QuillEditorComponent implements AfterViewInit, OnDestroy, OnInit {

  content$!: Observable<string>;
  document$!: Observable<Document>;
  private quill!: Quill | null;
  private documentSub!: Subscription;
  private connectionSubscription! : Subscription | null ;

  // Reference to the editor container in the DOM
  @ViewChild('editorContainer') editorContainer!: ElementRef;

  constructor(private service: CommunicatorService, private webSocketService : WebSocketService) {
    this.content$ = service.fileContent$ ;
    this.document$ = service.documentDisplayed$; 
  }
  
  ngAfterViewInit() {
    // Ensure that editorContainer is defined
    if (this.editorContainer) {
      
      // Subscribe to content changes
      this.content$.subscribe(content => {
        console.log(content);
        console.log(this.quill);
        
        if (this.quill) {
         
          this.quill.setText(content);
                   
        }      
      });
        this.document$.subscribe(
          response => { 
            console.log(response);
            
          
            setTimeout (()=> { this.createQuillEditor();})
             
          }
        )
      
    } else {
      console.error('editorContainer is not available in the view');
    }
    this.quill?.on('text-change', () => {
      const content = this.quill?.getText()}); // Get the updated content
      
    
  }

  sendMessage(): void {
    // Example of sending a message to the server
    this.webSocketService.sendMessage('hello', "world");
  }

  ngOnInit(): void {
    
    
    // Connect to WebSocket when the component is initialized
    this.webSocketService.connect();
    // Optionally, you can subscribe to the connection status observable
    this.connectionSubscription = this.webSocketService.getConnectionStatus().subscribe(isConnected => {
      console.log('WebSocket connection status:', isConnected);
    });
    setTimeout (()=> {
    this.sendMessage() ;
    },2000) ;
    
    
  }
  // Create a new Quill editor
  private createQuillEditor() : void {
    if (this.editorContainer && this.editorContainer.nativeElement) {
      if (this.quill) {
        this.quill = null;  // Reset the previous instance if needed
      }

      this.quill = new Quill(this.editorContainer.nativeElement, {
        theme: 'snow',
        modules: {
          toolbar: [
            [{ header: '1' }, { header: '2' }],
            ['bold', 'italic', 'underline'],
            ['image', 'code-block']
          ]
        }
      });
      
    } else {
      console.error('editorContainer.nativeElement is not available');
      
    }
  }

  ngOnDestroy() {
    // Unsubscribe to avoid memory leaks
    if (this.documentSub) {
      this.documentSub.unsubscribe();
    }
    this.webSocketService.disconnect();
    if (this.connectionSubscription) {
      this.connectionSubscription.unsubscribe();
    }
  }
}
