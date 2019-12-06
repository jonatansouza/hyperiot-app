import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LocalStorageProvider } from './services/local-storage';
import { NotificationService } from './services/notification.service';
import { NgModule, ModuleWithProviders} from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginService } from './services/login.service';
import { RecaptchaModule } from 'ng-recaptcha';

@NgModule({
  imports: [CommonModule, RecaptchaModule, HttpClientModule],
  exports: [CommonModule, RecaptchaModule, HttpClientModule]

})
export class CoreModule {
  static forRoot(): ModuleWithProviders {
    return{
      ngModule: CoreModule,
      providers: [
        NotificationService,
        LoginService,
        LocalStorageProvider
      ]
    };
  }
}
