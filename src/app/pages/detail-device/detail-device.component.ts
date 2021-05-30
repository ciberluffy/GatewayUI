import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Device } from 'src/app/models/device';
import { DeviceService } from 'src/app/services/device.service';

@Component({
  templateUrl: './detail-device.component.html',
  styleUrls: ['./detail-device.component.css']
})
export class DetailDeviceComponent implements OnInit {

  device!: Device;

  constructor(private router: Router, private route: ActivatedRoute, 
    private deviceService: DeviceService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.deviceService.getDevice(params.uid)
        .subscribe(data => {
          this.device = data;
        });
    });
  }

  DetailsGateway(usn: string): void {
    this.router.navigateByUrl(`gateway/detail/${usn}`);
  }

}
