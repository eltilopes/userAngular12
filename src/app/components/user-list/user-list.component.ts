import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: any;
  currentUser = null;
  currentIndex = -1;
  title = '';
  constructor(private router: Router, private userService: UserService ) { }

  ngOnInit(): void {
    this.retrieveUsers();
  }

  retrieveUsers() {
    this.userService.getAllUsers()
      .subscribe(
        data => {
          this.users = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }
  refreshList() {
    this.retrieveUsers();
    this.currentUser = null;
    this.currentIndex = -1;
  }

  setActiveUser(user : any, index : number) {
    this.currentUser = user;
    this.currentIndex = index;
  }
  
  addUser(): void {
    window.localStorage.removeItem("editUserId");
    window.localStorage.removeItem("actionEdit");
    this.router.navigate(['add']);
  };

  editUser(user: any): void {
    window.localStorage.removeItem("editUserId");
    window.localStorage.setItem("editUserId", user.id.toString());
    window.localStorage.setItem("actionEdit", "actionEdit");
    this.router.navigate(['add']);
  };

  deleteUser(user: any): void {
    this.userService.delete(user.id)
      .subscribe( data => {
        alert("Usuário Deletado");
      })
      window.location.reload();
  };
}
