import { AuthInterceptor } from './../core/services/auth.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ParticipantsService } from './participants.service';
import { ChartsModule } from 'ng2-charts';
import { CoreModule } from './../core/core.module';
import { MaterialModule } from './../shared/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CreateParticipantComponent } from './create-participant/create-participant.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParticipantComponent } from './participant/participant.component';
import { ParticipantDialogConfirmComponent } from './participant/participant-dialog-confirm';

const routes: Routes = [
  { path: '', component: ParticipantComponent},
  { path: 'create', component: CreateParticipantComponent},
];

@NgModule({
  declarations: [CreateParticipantComponent, ParticipantComponent, ParticipantDialogConfirmComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    CoreModule,
    ChartsModule,
    RouterModule.forChild(routes)
  ],
  entryComponents: [ParticipantDialogConfirmComponent],
  providers: [ParticipantsService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }]
})
export class ParticipantsModule { }
