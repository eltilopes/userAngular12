import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  invalidLogin: boolean = false;
  constructor( private formBuilder: FormBuilder, private router: Router, private apiService: AuthService) {  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
    const loginPayload = {
      username: this.loginForm.controls.username.value,
      password: this.loginForm.controls.password.value
    }
      this.apiService.attemptAuth(loginPayload).subscribe(
        (data: any)  => {
        if(data && data.status === 200) {
          window.localStorage.setItem('token', data.result.token);
          this.router.navigate(['users']);
        }else {
          this.invalidLogin = true;
          alert(data.message);
        }    
      },
      (error: HttpErrorResponse) => {
        console.log(error);
        this.invalidLogin = true;
      });
   
  }

  ngOnInit() {
    window.localStorage.removeItem('token');
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.compose([Validators.required])],
      password: ['', Validators.required]
    });
  }



}
