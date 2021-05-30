import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateDeviceComponent } from '../pages/create-device/create-device.component';
import { CreateGatewayComponent } from '../pages/create-gateway/create-gateway.component';
import { DetailDeviceComponent } from '../pages/detail-device/detail-device.component';
import { DetailGatewayComponent } from '../pages/detail-gateway/detail-gateway.component';
import { DeviceComponent } from '../pages/device/device.component';
import { GatewayComponent } from '../pages/gateway/gateway.component';

const routes: Routes = [
  { path: 'gateway', component: GatewayComponent },
  { path: 'device', component: DeviceComponent },
  { path: 'gateway/create', component: CreateGatewayComponent },
  { path: 'device/create', component: CreateDeviceComponent },
  { path: 'gateway/detail/:usn', component: DetailGatewayComponent },
  { path: 'device/detail/:uid', component:DetailDeviceComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminLayoutRoutingModule { }
