import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


const usersUrl = 'http://localhost:8080/users';
const emailUrl = 'http://localhost:8080/email';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  private options = { headers: new HttpHeaders().set('Content-Type', 'application/json') };

  login(loginPayload : any)  {
    return this.http.post('http://localhost:8080/' + 'token/generate-token', loginPayload);
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
