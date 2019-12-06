import { LoginService } from '../core/services/login.service';
import { FormControl, Validators } from '@angular/forms';
import { Component, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'hyperiot-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public username = new FormControl('', [Validators.required, Validators.email]);
  public passwd = new FormControl('', [Validators.required, Validators.minLength(8)]);
  public pathFrom = '';
  public resolveCaptcha = false;
  constructor(private zone: NgZone,
              private router: Router,
              private userService: LoginService,
              private route: ActivatedRoute) { 
                
              }

  ngOnInit() {
    this.pathFrom = this.route.snapshot.params.loginState;
  }
  login() {
    if (!this.username.valid || !this.passwd.valid) {
      return;
    }
    this.userService.login(this.username.value, this.passwd.value, this.pathFrom);
  }
}
