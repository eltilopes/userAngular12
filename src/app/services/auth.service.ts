import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/index';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiResponse } from '../model/api.response';

@Injectable({
    providedIn: 'root'
  })
export class AuthService {

  constructor(private http: HttpClient) {
  }

  attemptAuth(credentials: any): Observable<ApiResponse> {
    return this.http.post<ApiResponse>('http://localhost:8080/token/generate-token', credentials);
  }

}