import { AssetDetailDialogComponent } from './asset-detail/asset-detail-dialog.component';
import { AuthInterceptor } from './../core/services/auth.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AssetsService } from './assets.service';
import { ChartsModule } from 'ng2-charts';
import { CoreModule } from '../core/core.module';
import { MaterialModule } from '../shared/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CreateAssetComponent } from './create-asset/create-asset.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssetComponent } from './asset/asset.component';
import { AssetDetailComponent } from './asset-detail/asset-detail.component';

const routes: Routes = [
  { path: '', component: AssetComponent},
  { path: 'create', component: CreateAssetComponent},
  { path: 'detail', component: AssetDetailComponent},
];

@NgModule({
  declarations: [CreateAssetComponent, AssetComponent, AssetDetailComponent, AssetDetailDialogComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    CoreModule,
    ChartsModule,
    RouterModule.forChild(routes)
  ],
  entryComponents: [AssetDetailDialogComponent],
  providers: [AssetsService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }]
})
export class AssetsModule { }
