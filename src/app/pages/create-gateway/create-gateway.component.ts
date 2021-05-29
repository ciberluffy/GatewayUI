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
  templateUrl: './create-gateway.component.html',
  styleUrls: ['./create-gateway.component.css']
})
export class CreateGatewayComponent implements OnDestroy, OnInit {
  @ViewChildren(DataTableDirective)
  dtElements!: QueryList<DataTableDirective>;

  gatewayForm = new FormGroup({
    name: new FormControl('', 
      Validators.required
    ),
    address: new FormControl('',  Validators.compose([
      Validators.required,
      Validators.pattern("((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)")
    ])),
  });

  list1: Device[] = [];
  list2: Device[] = [];

  
  dtOptions: DataTables.Settings = {};
  dtOptions2: DataTables.Settings = {};
  dtTrigger1: Subject<any> = new Subject<any>();
  dtTrigger2: Subject<any> = new Subject<any>();
  changes!: boolean;

  constructor(private deviceService: DeviceService, 
              private gatewayService: GatewayService,
              private router: Router) { }

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

    this.deviceService.getLonelyDevices()
      .subscribe(data => {
        this.list2 = data;
        
        this.dtTrigger1.next();
        this.dtTrigger2.next();
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
    let device = this.list1.find(d => d.uid === uid) as Device;
    this.list2.push(device);
    this.list1.splice(this.list1.indexOf(device),1);
    
    this.rerender();
  }

  moveToList1(uid: number): void{
    if(this.list1.length < 10) {
      let device = this.list2.find(d => d.uid === uid) as Device;
      this.list1.push(device);
      this.list2.splice(this.list2.indexOf(device),1);
      
      this.rerender();
    }
  }

  Details(usn: number): void {
    console.log(usn);
  }

  onSubmit(): void {
    this.changes = true;
    if(this.gatewayForm.valid) {
      let gateway: Gateway = {
        name: this.gatewayForm.controls["name"].value as string,
        address: this.gatewayForm.controls["address"].value as string,
        usn: '',
        devices: this.list1
      };

      this.gatewayService.postGateway(gateway)
        .subscribe(data => {
          console.log(data);
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
