import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})
export class EmailComponent implements OnInit {
  email = {
    message: ''
  }
  submitted = false;

  constructor(private userService: UserService ) { }

  ngOnInit(): void {
  }

  sendEmail() {
    this.userService.sendEmail(this.email)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
        });
  }

  
  newMessage() {
    this.submitted = false;
    this.email ={
      message: ''
    }
  }
}
