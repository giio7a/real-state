import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SIENA_API} from '../app.config';

@Injectable({providedIn: 'root'})
export class UserRequestService {
  constructor(
    private http: HttpClient,
    @Inject(SIENA_API) private sienaApi: string,
  ) {}

  getCurrentUser() {
    return this.http.get<{email: string}>(`${this.sienaApi}/a/whoami`);
  }

  getCurrentUserRole() {
    return this.http.get<{role: string}>(`${this.sienaApi}/a/whoami/role`);
  }

  logIn(args: {email: string; password: string}) {
    const {email, password} = args;
    return this.http.post<{token: string}>(`${this.sienaApi}/auth/login`, {email, password});
  }

  registerUser() {
    // {{host}}{{apiPathAuth}}/register
    // return this.http.post(`${this.sienaApi}/a/register`, {});
    throw new Error('Method not implemented.');
  }

  updateUserRole() {
    // {{host}}{{apiPathAuth}}/users/{{user_id}}/role
    throw new Error('Method not implemented.');
  }
}
