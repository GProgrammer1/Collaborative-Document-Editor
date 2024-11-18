import { Component } from '@angular/core';

import { EditorComponent } from '../editor/editor.component';
import { NavbarComponent } from '../navbar/navbar.component';

import { QuillEditorComponent as QuillEditorComponent } from "../quill-editor/quill-editor.component";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [EditorComponent, NavbarComponent, QuillEditorComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

}
