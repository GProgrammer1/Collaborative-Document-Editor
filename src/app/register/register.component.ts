import { Component } from '@angular/core';

import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {MatFormFieldModule, MatLabel} from '@angular/material/form-field'
import { MatInput } from '@angular/material/input';
import { User, UserService } from '../user.service';

import { Router, RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [MatFormFieldModule, MatButtonModule, MatLabel, MatInput
    ,ReactiveFormsModule, FormsModule, RouterOutlet],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  constructor( private service: UserService, private router : Router){}
  registerForm = new FormGroup({
    firstname: new FormControl<string>('', {
      validators:  [Validators.required],
      nonNullable: true
    }) ,
    lastname: new FormControl<string>('', {
      validators:  [Validators.required],
      nonNullable: true
    }) ,
    email: new FormControl<string>('', {
      validators:  [Validators.required, Validators.email],
      nonNullable: true
    }) ,
    password: new FormControl<string>('',{
      validators: Validators.required,
      nonNullable: true
    })
  })
  ;

  register() { 
    if (this.registerForm.invalid) {
      
      return ;
    }
    const user : User = this.registerForm.getRawValue() as User;
    
    this.service.register(user).subscribe({
      next: 
        (response : {token: string}) => {
          
          this.router.navigate(['/main'])
        }
    }) ;
        
  }
}
