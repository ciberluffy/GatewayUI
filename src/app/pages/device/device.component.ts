import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Device } from '../../models/device';
import { DeviceService } from 'src/app/services/device.service';

@Component({
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.css']
})
export class DeviceComponent implements OnDestroy, OnInit {

  dtOptions: DataTables.Settings = {};
  devices: Device[] = [];

  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private deviceService: DeviceService) { }

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

  Details(usn: number): void {
    console.log(usn);
  }

  AddDevice(): void {
    console.log("adding gateway");
  }

}
