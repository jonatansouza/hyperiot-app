import { LoginService } from './core/services/login.service';
import { Router, NavigationEnd } from '@angular/router';
import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'hyperiot-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  @ViewChild('drawer', {static: true}) drawer;
  public breadcrumbs = [];
  constructor(private router: Router,
              private loginService: LoginService) {
    this.router.events.subscribe(evt => {
      if (evt instanceof NavigationEnd) {
        this.breadcrumbs = [];
        const txts = evt.url.split('/').filter(el => !!el);
        let path = '/';
        txts.unshift('');
        txts.forEach((el, i) => {
          path += `${el}/`;
          let txt = (!el && i === 0) ? 'início' : el;
          txt = this.dePara(txt);
          const bc = { url: path, txt };
          const reg = /\d/;
          if (!reg.test(txt)) {
            this.breadcrumbs.push(bc);
          }
        });
      }
    });
  }
  dePara(txt: string) {
    switch (txt) {
      case 'detail':
        return 'Detalhes';
      case 'onesignal':
        return 'Campanha';
      case 'create':
        return 'Cadastrar Participante';
      default:
        return txt;
    }
  }
  navTo(url) {
    this.router.navigate([url]);
  }
  isInLogin() {
    if (!this.breadcrumbs || !this.breadcrumbs.length) {
      return false;
    }
    return !!this.breadcrumbs.find(el => el.txt.includes('login'));
  }
  isLoggedIn() {
    return this.loginService.isLoggedIn();
  }
  public logout() {
    this.drawer.close();
    this.loginService.logout();
  }
}
