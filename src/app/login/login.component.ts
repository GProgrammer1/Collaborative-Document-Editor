import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {MatFormFieldModule, MatLabel} from '@angular/material/form-field'
import { MatInput } from '@angular/material/input';
import { UserService } from '../user.service';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatFormFieldModule, MatButtonModule, MatLabel, MatInput
    ,ReactiveFormsModule, FormsModule, RouterOutlet, RouterLink
  ],
  
templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private service : UserService,
    private router : Router
  ) {}
  loginForm = new FormGroup({
    email: new FormControl<string>('', {
      validators:  [Validators.required, Validators.email],
      nonNullable: true
    }) ,
    password: new FormControl<string>('',{
      validators: Validators.required,
      nonNullable: true
    })
  }) ;

  login() { 
    const credentials = this.loginForm.getRawValue();
    
    this.service.authenticate(credentials).subscribe({
      next: 
        (response : {token: string}) => {
          
          const token = response.token ;
          localStorage.setItem('token', token) ;
          this.router.navigate(['/main'])
        },
        error:
         (error : string) => {
            console.error('Error: ', error);
            
         }
    }) ;
        
    } 
  }


