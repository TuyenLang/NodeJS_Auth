import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  standalone:true,
  imports:[ReactiveFormsModule],
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  form: FormGroup;
  authService = inject(AuthService);
  router = inject(Router);
  
  constructor(private fb: FormBuilder){
    this.form = this.fb.group({
      email: new FormControl('',[Validators.required, Validators.email]),
      password: new FormControl('',[Validators.required])
    })
  }
  onSubmit(){
    if(this.form.valid){
      console.log(this.form.value);
      this.authService.login(this.form.value).subscribe(res=>{
        this.router.navigate(['/dashboard']);
      })

    }
  }

}
