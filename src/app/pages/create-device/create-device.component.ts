import { Component, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';

import { Device } from 'src/app/models/device';
import { Gateway } from 'src/app/models/gateway';
import { DeviceService } from 'src/app/services/device.service';
import { GatewayService } from 'src/app/services/gateway.service';

@Component({
  templateUrl: './create-device.component.html',
  styleUrls: ['./create-device.component.css']
})
export class CreateDeviceComponent implements OnDestroy, OnInit {

  changes!: boolean;

  dtOptions: DataTables.Settings = {};
  gateways: Gateway[] = [];
  selectedGateway!: Gateway;
  dtTrigger: Subject<any> = new Subject<any>();

  deviceForm: FormGroup = new FormGroup({
    uid: new FormControl(0, Validators.required),
    vendor: new FormControl('', Validators.required),
    online: new FormControl(false),
    created: new FormControl(new Date(Date.now()).toISOString().split('T')[0], Validators.required)
  });

  constructor(private gatewayService: GatewayService, private deviceService: DeviceService, private router: Router) { }

  ngOnInit(): void {
    this.changes = false;

    this.dtOptions = {
      pagingType: 'full_numbers',
      "scrollX": true
    };

    this.gatewayService.getGatewaysAvailable()
      .subscribe(data => {
        this.gateways = data;
        
        this.dtTrigger.next();
      });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  onSubmit(): void {
    this.changes = true;
    if(this.deviceForm.valid) {
      let device: Device = {
        uid: this.deviceForm.controls["uid"].value as number,
        vendor: this.deviceForm.controls["vendor"].value as string,
        online: this.deviceForm.controls["online"].value as boolean,
        created: this.deviceForm.controls["created"].value as string,
        gateway: this.selectedGateway
      };

      this.deviceService.postDevice(device)
        .subscribe(data => {
          console.log(data);
          this.router.navigateByUrl('/device');
        });
    }
  }

  onBack(): void {
    this.router.navigateByUrl('/device');
  }

  Select(gateway: Gateway): void {
    this.selectedGateway = gateway;
  }

  changeDo(): void {
    this.changes = true;
  }

}
