import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateGatewayComponent } from '../pages/create-gateway/create-gateway.component';
import { DeviceComponent } from '../pages/device/device.component';
import { GatewayComponent } from '../pages/gateway/gateway.component';

const routes: Routes = [
  { path: 'gateway', component: GatewayComponent },
  { path: 'device', component: DeviceComponent },
  { path: 'gateway/create', component: CreateGatewayComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminLayoutRoutingModule { }
