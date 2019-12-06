import { NotificationService } from 'src/app/core/services/notification.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { LocalStorageProvider } from './local-storage';
import { User } from '../../models/user';
import { Injectable, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private user: User;
  private token;
  constructor(private router: Router,
              private localStorageProvider: LocalStorageProvider,
              private notification: NotificationService,
              private http: HttpClient,
              private route: ActivatedRoute) {
                try {
                  this.user = JSON.parse(localStorage.getItem('user'));
                  this.token = localStorage.getItem('token');
                } catch (e) {
                  console.warn('empty storage');
                }
  }
  getToken() {
    return `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImlhdCI6MTU3NTI5MTYwN30.5JjkIPZ3ZQrGO9j3M7QlyaF6qlKIFlbvMkbpq-a1Qxc`;
  }
  setToken(token) {
    this.token = token;
    this.localStorageProvider.setItem('token', token);
  }
  setUser(user: User) {
    this.user = user;
    delete this.user.password;
    this.localStorageProvider.setItem('user', JSON.stringify(user));
  }
  login(email: string, password: string, pathFrom = '') {
    this.http.post(`${environment.api.url}/users/login`, {email, password})
      .subscribe(res => {
        const {token, user} = res as any;
        if (!token) {
          this.notification.notify('Ocorreu um erro com o login');
          return;
        }
        this.setToken(token);
        if (user) {
          this.setUser(user);
        }
        let path = '/';
        if (pathFrom) {
          path = pathFrom;
        }
        this.router.navigate([path]);
      }, err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this.notification.notify(err.error.message || err.message);
          }
        }
      });
  }
  getUser() {
    return this.user;
  }
  logout(loginState = '') { 
    this.user = undefined;
    this.localStorageProvider.setItem('user', '');
    this.localStorageProvider.setItem('token', '');
    this.router.navigate(['/login', {loginState}]);
  }
  isLoggedIn() {
    return !!this.user;
  }
}
