import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataTablesModule } from "angular-datatables";

import { AdminLayoutRoutingModule } from './admin-layout-routing.module';
import { GatewayComponent } from '../pages/gateway/gateway.component';
import { DeviceComponent } from '../pages/device/device.component';
import { CreateGatewayComponent } from '../pages/create-gateway/create-gateway.component';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { CreateDeviceComponent } from '../pages/create-device/create-device.component';
import { DetailGatewayComponent } from '../pages/detail-gateway/detail-gateway.component';
import { DetailDeviceComponent } from '../pages/detail-device/detail-device.component';


@NgModule({
  declarations: [
    GatewayComponent,
    DeviceComponent,
    CreateGatewayComponent,
    CreateDeviceComponent,
    DetailGatewayComponent,
    DetailDeviceComponent
  ],
  imports: [
    CommonModule,
    AdminLayoutRoutingModule,
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule 
  ]
})
export class AdminLayoutModule { }
