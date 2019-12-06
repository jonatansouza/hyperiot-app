import { ParticipantsService } from './../../participants/participants.service';
import { AssetsService } from './../assets.service';
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
  public ownerList;
  public loading = false;
  constructor(public route: ActivatedRoute,
              public assetService: AssetsService,
              public notification: NotificationService,
              public dialog: MatDialog
    ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(res => {
      const { asset } = res;
      if (!asset) {
        this.notification.notify('Não foi possível carregar o asset');
        return;
      }
      this.assetDetail = JSON.parse(asset);
      this.loading = true;
      this.assetService.getOwnerDetails().subscribe(res => {
        this.ownerList = res;
        this.loading = false;
      });
    })
  }
  getEmail(email = '#') {
    return email.split('#')[1];
  }

  removeUser(allowedUser) {
    console.log(allowedUser);
    const dialogRef = this.dialog.open(AssetDetailDialogComponent, {
      width: '250px',
      data: this.ownerList.map(el => el.email)
    });
  }
  filterAllowedUsers() {
    (this.assetDetail.allowedUsers || []).filter(el => !this.assetDetail.owner);
  }
  addUser(){
    const dialogRef = this.dialog.open(AssetDetailDialogComponent, {
      width: '500px',
      data: this.ownerList.map(el => el.email)
    });
    dialogRef.afterClosed().subscribe(result => {
      if (!!result) {
        const transaction = {
          device: this.assetDetail.commodityId,
          allowedUser: result,
          owner: this.assetDetail.owner
        }
        console.log('submit ==> ', transaction);
        
        // const {name} = result;
        // this.ps.removeParticipant(result.email)
        //   .subscribe(res => {
        //     this.allowedUsers.splice(this.allowedUsers.indexOf(result), 1);
        //     this.nf.notify(`${name}, Removido!`);
        //     this.loading = false;
        //   }, err => {
        //     this.nf.notify('Erro na transação.');
        //     this.loading = false;
        //   })
      }
    });
  }

}
