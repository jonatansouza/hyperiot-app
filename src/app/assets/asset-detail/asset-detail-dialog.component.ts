import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'hyperiot-asset-detail-dialog',
  template: `
    <h1 mat-dialog-title>Escolha um usuário da sua lista</h1>
    <div mat-dialog-actions>
      <button mat-button (click)="onNoClick()">Cancelar</button>
      <button mat-button color="accent" [mat-dialog-close]="data" cdkFocusInitial>Confirmar</button>
    </div>
  `
})
export class AssetDetailDialogComponent {
  allowedUsers = [];
  constructor(public dialogRef: MatDialogRef<AssetDetailDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any ) { }
  
}
