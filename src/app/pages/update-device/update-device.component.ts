import { Component, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';

import { Device } from 'src/app/models/device';
import { Gateway } from 'src/app/models/gateway';
import { DeviceService } from 'src/app/services/device.service';
import { GatewayService } from 'src/app/services/gateway.service';

@Component({
  templateUrl: './update-device.component.html',
  styleUrls: ['./update-device.component.css']
})
export class UpdateDeviceComponent implements OnDestroy, OnInit {

  changes!: boolean;

  gateways: Gateway[] = [];
  device!: Device;
  deviceForm!: FormGroup;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private gatewayService: GatewayService, private deviceService: DeviceService, 
              private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.changes = false;

    this.dtOptions = {
      pagingType: 'full_numbers',
      "scrollX": true
    };

    this.route.params.subscribe((params: Params) => {
      this.deviceService.getDevice(params.uid)
        .subscribe(data => {
          this.device = data;

          this.deviceForm = new FormGroup({
            vendor: new FormControl(this.device.vendor, Validators.required),
            online: new FormControl(this.device.online),
            created: new FormControl(this.device.created.split('T')[0], Validators.required)
          });

          this.gatewayService.getGatewaysAvailable()
            .subscribe(data => {
              this.gateways = data;
              
              setTimeout(() => {
                this.dtTrigger.next();
              });
            });
        });
    });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  onSubmit(): void {
    this.changes = true;
    if(this.deviceForm.valid) {
      let device: Device = {
        uid: this.device.uid,
        vendor: this.deviceForm.controls["vendor"].value as string,
        online: this.deviceForm.controls["online"].value as boolean,
        created: this.deviceForm.controls["created"].value as string,
        gateway: this.device.gateway
      };

      this.deviceService.postUpdateDevice(device)
        .subscribe(data => {
          this.router.navigateByUrl('/device');
        });
    }
  }

  onBack(): void {
    this.router.navigateByUrl('/device');
  }

  Select(gateway: Gateway): void {
    this.device.gateway = gateway;
  }

  changeDo(): void {
    this.changes = true;
  }

}
