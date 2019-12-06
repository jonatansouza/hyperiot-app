import { NotificationService } from './../../core/services/notification.service';
import { AssetsService } from './../assets.service';
import { Router } from '@angular/router';
import { Component, OnInit, ɵConsole } from '@angular/core';

@Component({
  selector: 'hyperiot-asset',
  templateUrl: './asset.component.html',
  styleUrls: ['./asset.component.scss']
})
export class AssetComponent implements OnInit {
  public assets = [];
  public allowedUsers = [];
  public displayedColumns = ['name', 'description'];
  public loading = false;
  constructor(private router: Router,
              private assetService: AssetsService,
              private notification: NotificationService) { }

  ngOnInit() {
    this.loading = true;
    this.assetService.getAssets().subscribe(res => {
      this.assets = res;
    }, err => {
      this.notification.notify('Não foi possível obter a lista de dispositivos.');
    }, () => {
      this.loading = false;
    });
  }
  registerDevice() {
    this.router.navigate(['/dispositivos/create']);
  }
  showDetails(asset){
    this.router.navigate(['/dispositivos/detail'], {queryParams: {asset: JSON.stringify(asset)}});
  }
}
