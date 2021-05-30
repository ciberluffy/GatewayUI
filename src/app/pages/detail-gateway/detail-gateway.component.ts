import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Gateway } from 'src/app/models/gateway';
import { GatewayService } from 'src/app/services/gateway.service';

@Component({
  templateUrl: './detail-gateway.component.html',
  styleUrls: ['./detail-gateway.component.css']
})
export class DetailGatewayComponent implements OnInit {

  gateway!: Gateway;
  dtOptions: DataTables.Settings = {};

  constructor(private router: Router, private route: ActivatedRoute, 
    private gatewayService: GatewayService) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      "scrollX": true
    };
    this.route.params.subscribe((params: Params) => {
      this.gatewayService.getGateway(params.usn)
        .subscribe(data => {
          this.gateway = data;
        });
    });
  }

  DetailsDevice(uid: number) {
    this.router.navigateByUrl(`device/detail/${uid.toString()}`);
  }

  UpdateGateway() {
    this.router.navigateByUrl(`gateway/update/${this.gateway.usn}`);
  }
}
