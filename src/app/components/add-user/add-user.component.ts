import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import {Router} from "@angular/router";

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  
  user : any = {
    name: null,
    login: null,
    password: null,
    email: null,
    admin: false
  }
  userName = ''

  addForm!: FormGroup ;
  

   submitted = false;

  constructor(private router: Router, private userService: UserService, private formBuilder: FormBuilder) {
   }

  ngOnInit(): void {
    this.addForm = this.formBuilder.group({
      userName: ['', Validators.required]
    });
    let userId = window.localStorage.getItem("editUserId");
    let actionEdit = window.localStorage.getItem("actionEdit");
    if(actionEdit) {
      if(!userId) {
        alert("Invalid action.")
        this.router.navigate(['users']);
        return;
      }
      this.userService.get(+userId)
      .subscribe(
        response => {
          console.log(response);
          this.user  = response
          this.submitted = false;
        },
        error => {
          console.log(error);
        });
        window.localStorage.removeItem("editUserId");
      }  else{
        this.newUser()
      }  
  }

  saveUser() {
    console.log(this.addForm)
 
    if(window.localStorage.getItem("actionEdit")){
      this.userService.update( this.user.id,this.user)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
          this.router.navigate(['users']);
        },
        error => {
          console.log(error);
          alert("Usuário não foi preenchido corretamente!");
        });
    }
    this.userService.add(this.user)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
          this.router.navigate(['users']);
        },
        error => {
          console.log(error);
          alert("Usuário não foi preenchido corretamente!");
        });
  }

  newUser() {
    this.submitted = false;
    this.user = {
      name: '',
      login: '',
      password: '',
      email: '',
      admin: false
    };
  }
}
