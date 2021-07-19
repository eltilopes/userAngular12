import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


const baseUrl = 'http://localhost:8080';
const usersUrl = baseUrl + '/users';
const emailUrl = baseUrl + '/email';
const tokenUrl = baseUrl + '/token';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  private options = { headers: new HttpHeaders().set('Content-Type', 'application/json') };

  login(userLogin : any)  {
    return this.http.post(tokenUrl, userLogin, this.options);
  }

  getAllUsers() {
    return this.http.get(usersUrl);
  }

  get(id : number) {
    return this.http.get(`${usersUrl}/${id}`);
  }

  sendEmail(message : any) {
    return this.http.post(emailUrl, message, this.options);
  }

  add(user : any) {
    return this.http.post(usersUrl, user, this.options);
  }

  update(id : number, user : string) {
    return this.http.put(`${usersUrl}/${id}`, user, this.options);
  }

  delete(id: number) {
    return this.http.delete(`${usersUrl}/${id}`);
  }

 
}
