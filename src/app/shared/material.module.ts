import { NgModule } from '@angular/core';
import {MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatCardModule,
        MatIconModule,
        MatToolbarModule,
        MatTableModule,
        MatProgressBarModule,
        MatSnackBarModule,
        MatSidenavModule,
        MatProgressSpinnerModule,
        MatChipsModule,
        MatPaginatorModule,
        MatDialogModule,
        MatSelectModule} from '@angular/material';
        

const materialModules = [
    MatDialogModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatToolbarModule,
    MatTableModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    MatPaginatorModule
];

@NgModule({
  declarations: [],
  imports: materialModules,
  exports: materialModules
})
export class MaterialModule { }
