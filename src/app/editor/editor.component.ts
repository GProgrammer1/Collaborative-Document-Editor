import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {  QuillModule } from 'ngx-quill';

@Component({
  selector: 'app-editor',
  standalone: true,
  templateUrl: './editor.component.html',
  styles: [`
    quill-editor {
      height: 4px;
    }
  `],
  imports: [QuillModule,  FormsModule,]
})
export class EditorComponent {
  editorContent: string = '';

  onContentChanged(content: string) {
    this.editorContent = content;
  }
}
