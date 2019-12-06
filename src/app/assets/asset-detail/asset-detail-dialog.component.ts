import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'hyperiot-asset-detail-dialog',
  template: `
    <style>

    </style>
    <h1 mat-dialog-title>Autorização de usuário</h1>
    <div mat-dialog-content *ngIf="!allowedUsers.length">
      <p>Não há usuários ná sua lista
      <small style="color: gray">Na seção Participantes é possível adiciona-los</small>
      </p>
    </div>

    <div mat-dialog-content *ngIf="allowedUsers.length">
      <mat-form-field>
        <mat-label>Lista de usuários autorizados</mat-label>
        <mat-select [(value)]="selectedUser">
          <mat-option *ngFor="let item of allowedUsers" [value]="item">
            {{item}}
          </mat-option>
        </mat-select>
      </mat-form-field>
    </div>
    
    <div mat-dialog-actions>
      <button mat-button (click)="onNoClick()">Cancelar</button>
      <button mat-button color="accent" [mat-dialog-close]="selectedUser" cdkFocusInitial>Confirmar</button>
    </div>
  `
})
export class AssetDetailDialogComponent {
  selectedUser;
  allowedUsers = [];
  constructor(public dialogRef: MatDialogRef<AssetDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { 
      this.allowedUsers = this.data || [];
    }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
