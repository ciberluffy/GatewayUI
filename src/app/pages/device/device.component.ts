import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Device } from '../../models/device';
import { DeviceService } from 'src/app/services/device.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.css']
})
export class DeviceComponent implements OnDestroy, OnInit {

  dtOptions: DataTables.Settings = {};
  devices: Device[] = [];

  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private deviceService: DeviceService, private router: Router) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      "scrollX": true
    };
    this.deviceService.getDevices()
      .subscribe(data => {
        this.devices = data;
        
        this.dtTrigger.next();
      });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  Details(uid: number): void {
    this.router.navigateByUrl(`device/detail/${uid.toString()}`);
  }

  Update(uid: number): void {
    this.router.navigateByUrl(`device/update/${uid.toString()}`);
  }

  AddDevice(): void {
    this.router.navigateByUrl('device/create');
  }

}
