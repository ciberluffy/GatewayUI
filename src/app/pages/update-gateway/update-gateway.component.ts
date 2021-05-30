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
  templateUrl: './update-gateway.component.html',
  styleUrls: ['./update-gateway.component.css']
})
export class UpdateGatewayComponent implements  OnDestroy, OnInit {
  @ViewChildren(DataTableDirective)
  dtElements!: QueryList<DataTableDirective>;

  gatewayForm!: FormGroup;
  gateway!: Gateway;
  list2: Device[] = [];

  
  dtOptions: DataTables.Settings = {};
  dtOptions2: DataTables.Settings = {};
  dtTrigger1: Subject<any> = new Subject<any>();
  dtTrigger2: Subject<any> = new Subject<any>();
  changes!: boolean;

  constructor(private deviceService: DeviceService, 
              private gatewayService: GatewayService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      "scrollX": true,
      destroy:true,
      order: [0, "asc"]
    };
    this.dtOptions2 = {
      pagingType: 'full_numbers',
      "scrollX": true,
      destroy:true,
      order: [1, "asc"]
    };
    this.changes = false;

    this.route.params.subscribe((params: Params) => {
      this.gatewayService.getGateway(params.usn)
        .subscribe(data => {
          this.gateway = data;

          this.gatewayForm= new FormGroup({
            name: new FormControl(this.gateway.name, 
              Validators.required
            ),
            address: new FormControl(this.gateway.address,  Validators.compose([
              Validators.required,
              Validators.pattern("((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)")
            ]))
          });

          setTimeout(() => {
            this.dtTrigger1.next();
          });

          this.deviceService.getLonelyDevices()
            .subscribe(data => {
              this.list2 = data;
              setTimeout(() => {
                this.dtTrigger2.next();
              });
            });
        });
    });
  }

  rerender(): void {
    this.dtElements.forEach((dtElement: DataTableDirective) => {
      if (dtElement.dtInstance)
        dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
        });
    });
    setTimeout(() => {
      this.dtTrigger1.next();
      this.dtTrigger2.next();
    });

  }

  ngOnDestroy(): void {
    this.dtTrigger1.unsubscribe();
    this.dtTrigger2.unsubscribe();
  }

  moveToList2(uid: number): void{
    let device = this.gateway.devices.find(d => d.uid === uid) as Device;
    this.list2.push(device);
    this.gateway.devices.splice(this.gateway.devices.indexOf(device),1);
    
    this.rerender();
  }

  moveToList1(uid: number): void{
    if(this.gateway.devices.length < 10) {
      let device = this.list2.find(d => d.uid === uid) as Device;
      this.gateway.devices.push(device);
      this.list2.splice(this.list2.indexOf(device),1);
      
      this.rerender();
    }
  }

  onSubmit(): void {
    this.changes = true;
    if(this.gatewayForm.valid) {
      let gateway: Gateway = {
        name: this.gatewayForm.controls["name"].value as string,
        address: this.gatewayForm.controls["address"].value as string,
        usn: this.gateway.usn,
        devices: this.gateway.devices
      };
      
      this.gatewayService.postUpdateGateway(gateway)
        .subscribe(data => {
          this.router.navigateByUrl('/');
        });
    }
  }

  onBack(): void {
    this.router.navigateByUrl('/');
  }

  changeDo(): void {
    this.changes = true;
  }

}
