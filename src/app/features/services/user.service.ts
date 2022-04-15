import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { signinInterface, signUpInterface, userInterface } from 'src/app/core/interfaces/user.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = environment.ApiUrl;

  constructor(private http: HttpClient) { }

  public signin(user: signinInterface) {
    return this.http.post<userInterface>(this.url + '/user', user);
  }

  public signup(user: signUpInterface) {
    return this.http.put<userInterface>(this.url + '/user', user);
  }
}
