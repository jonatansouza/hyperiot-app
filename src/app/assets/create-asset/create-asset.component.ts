import { NotificationService } from 'src/app/core/services/notification.service';
import { AssetsService } from '../assets.service';
import { FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'hyperiot-create-asset',
  templateUrl: './create-asset.component.html',
  styleUrls: ['./create-asset.component.scss']
})
export class CreateAssetComponent implements OnInit {
  public deviceName = new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9]+$')]);
  public deviceDescription = new FormControl('', [Validators.required]);
  public loading;
  constructor(private assetService: AssetsService,
              private notificationService: NotificationService) { }

  ngOnInit() {
  }

  submitForm() {
    this.loading = true;
    const data = {
      name: this.deviceName.value,
      description: this.deviceDescription.value
    };
    this.assetService.postAsset(data).subscribe(res => {
      this.notificationService.notify('Dispositivo Registrado com sucesso!');
      this.loading = false;
    }, err => {
      const errorMessage = (err && err.error && err.error.err && err.error.err.msg ) ? `, ${err.error.err.msg}.` : '.';
      this.notificationService.notify(`Erro na operação${errorMessage}`);
      this.loading = false;
    });
  }

}
