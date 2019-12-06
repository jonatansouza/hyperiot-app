import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { LoginService } from './login.service';
import { tap } from 'rxjs/operators';
import { NotificationService } from './notification.service';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(public loginService: LoginService,
              public notification: NotificationService,
              public router: Router,
              public activatedRouter: ActivatedRoute) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.loginService.getToken();
    console.log(token);
    if (token && !this.noAppendTokenRoutes(request)) {
       request = request.clone({
         setHeaders:  {Authorization: `Bearer ${token}`}
       });
    }
    return next.handle(request);
    // .pipe(
    //     tap(res => {
    //         // ok response
    //     }, err => {
    //       if (err instanceof HttpErrorResponse) {
    //         if (err.status === 401) {
    //           this.notification.notify('Sua seção expirou 😕');
    //           this.loginService.logout(this.router.url);
    //         }
    //       }
    //     })
    // );
  }
  public noAppendTokenRoutes(request) {
    const {url} = request;
    return (url && url.includes('login'));
  }
}