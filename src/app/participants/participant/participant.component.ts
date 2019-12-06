import { NotificationService } from './../../core/services/notification.service';
import { ParticipantsService } from './../participants.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ParticipantDialogConfirmComponent } from './participant-dialog-confirm';

@Component({
  selector: 'hyperiot-participant',
  templateUrl: './participant.component.html',
  styleUrls: ['./participant.component.scss']
})
export class ParticipantComponent implements OnInit {
  public allowedUsers = [];
  public displayedColumns = ['name', 'email', 'action'];
  public loading = false;
  constructor(private router: Router,
              private ps: ParticipantsService,
              private nf: NotificationService,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.loading = true;
    this.ps.getParticipant().subscribe(res => {
      this.allowedUsers = res;
      this.loading = false;
    }, err => {
       this.loading = false;
    });
  }
  registerUser() {
    this.router.navigate(['/participantes/create']);
  }
  removeUser(user) {
    const dialogRef = this.dialog.open(ParticipantDialogConfirmComponent, {
      width: '250px',
      data: user
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!!result) {
        const {name} = result;
        this.loading = true;
        this.ps.removeParticipant(result.email)
          .subscribe(res => {
            this.allowedUsers.splice(this.allowedUsers.indexOf(result), 1);
            this.nf.notify(`${name}, Removido!`);
            this.loading = false;
          }, err => {
            this.nf.notify('Erro na transação.');
            this.loading = false;
          })
      }
    });
  }
}
