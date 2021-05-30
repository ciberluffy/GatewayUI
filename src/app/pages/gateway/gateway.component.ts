import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Gateway } from '../../models/gateway';
import { Router } from '@angular/router';
import { GatewayService } from 'src/app/services/gateway.service';

@Component({
  templateUrl: './gateway.component.html',
  styleUrls: ['./gateway.component.css']
})
export class GatewayComponent implements OnDestroy, OnInit {

  dtOptions: DataTables.Settings = {};
  gateways: Gateway[] = [];

  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private gatewayService: GatewayService, private router: Router) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      "scrollX": true
    };
    this.gatewayService.getGateways()
      .subscribe(data => {
        this.gateways = data;
        
        this.dtTrigger.next();
      });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  Details(usn: string): void {
    this.router.navigateByUrl(`gateway/detail/${usn}`);
  }

  Update(usn: string): void {
    this.router.navigateByUrl(`gateway/update/${usn}`);
  }

  AddGateway(): void {
    this.router.navigateByUrl('gateway/create');
  }
}
