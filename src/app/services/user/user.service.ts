import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/environments/environment';
import { SignupUserRequest } from 'src/app/models/interfaces/user/signupUserRequest';
import { Observable } from 'rxjs';
import { signupUserResponse } from 'src/app/models/interfaces/user/signupUserResponse';
import { AuthRequest } from 'src/app/models/interfaces/user/auth/AuthRequest';
import { AuthResponse } from 'src/app/models/interfaces/user/auth/AuthResponse';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private API_URL = environment.API_URL

  constructor(private http: HttpClient) { }

  signupUser(requestDatas: SignupUserRequest): Observable<signupUserResponse>{
    return this.http.post<signupUserResponse>(
      `${this.API_URL}/user`, requestDatas
    )
  }

  authUser(requestDatas: AuthRequest): Observable<AuthResponse>{
    return this.http.post<AuthResponse>(`${this.API_URL}/auth`, requestDatas)
  }
}
