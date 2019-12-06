import { AuthGuard } from './core/services/auth.guard';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'participantes',
    // canActivate: [AuthGuard],
    loadChildren: () => import('./participants/participants.module').then(mod => mod.ParticipantsModule),
  },
  {
    path: 'dispositivos',
    // canActivate: [AuthGuard],
    loadChildren: () => import('./assets/assets.module').then(mod => mod.AssetsModule),
  },
  {
    path: '**',
    redirectTo: '/participantes',
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
