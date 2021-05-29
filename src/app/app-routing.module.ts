import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'gateway',
    pathMatch: 'full'
  },
  { 
    path: '', 
    component: AdminLayoutComponent,
    loadChildren: () => import('./admin-layout/admin-layout.module').then(m => m.AdminLayoutModule) 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
