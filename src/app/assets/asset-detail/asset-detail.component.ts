import { AssetDetailDialogComponent } from './asset-detail-dialog.component';
import { NotificationService } from './../../core/services/notification.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'hyperiot-asset-detail',
  templateUrl: './asset-detail.component.html',
  styleUrls: ['./asset-detail.component.scss']
})
export class AssetDetailComponent implements OnInit {
  public assetDetail;
  constructor(public route: ActivatedRoute,
              public notification: NotificationService,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.route.queryParams.subscribe(res => {
      const { asset } = res;
      if (!asset) {
        this.notification.notify('Não foi possível carregar o asset');
        return;
      }
      this.assetDetail = JSON.parse(asset);
    })
  }
  getEmail(email = '#') {
    return email.split('#')[1];
  }

  removeUser(allowedUser) {
    console.log(allowedUser);
    const dialogRef = this.dialog.open(AssetDetailDialogComponent, {
      width: '250px',
      data: allowedUser
    });
  }
  addUser(){
    const dialogRef = this.dialog.open(AssetDetailDialogComponent, {
      width: '250px'
    });
  }

}
