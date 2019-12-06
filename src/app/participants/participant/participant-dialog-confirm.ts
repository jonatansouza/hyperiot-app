import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


@Component({
  selector: 'hyperiot-participant-dialog-confirm',
  template: `
  <h1 mat-dialog-title>Tem certeza que deseja remover {{data.name}}?</h1>
  <div mat-dialog-actions>
    <button mat-button (click)="onNoClick()">Cancelar</button>
    <button mat-button color="accent" [mat-dialog-close]="data" cdkFocusInitial>Confirmar</button>
  </div>
  `,
})
export class ParticipantDialogConfirmComponent {

  constructor(
    public dialogRef: MatDialogRef<ParticipantDialogConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}