import { NotificationService } from 'src/app/core/services/notification.service';
import { ParticipantsService } from './../participants.service';
import { FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'hyperiot-create-participant',
  templateUrl: './create-participant.component.html',
  styleUrls: ['./create-participant.component.scss']
})
export class CreateParticipantComponent implements OnInit {
  public userName = new FormControl('', Validators.required);
  public userEmail = new FormControl('', [Validators.required, Validators.email]);
  public loading = false;
  constructor(private participantService: ParticipantsService,
              private notificationService: NotificationService) { }

  ngOnInit() {
  }

  submitForm() {
    const data = {
      name: this.userName.value,
      email: this.userEmail.value
    };
    this.loading = true;
    this.participantService.postParticipant(data).subscribe(res => {
      this.notificationService.notify('Usuário Registrado na sua White List.');
      this.loading = false;
    }, err => {
      this.loading = false;
      if (err && err.error && err.error.err && err.error.err.msg && err.error.err.msg) {
        this.notificationService.notify(`Falha na transação, ${err.error.err.msg}`);
        return;
      }
      this.notificationService.notify('Falha na transação.')
    });
  }

}
