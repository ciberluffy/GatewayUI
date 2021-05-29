import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Device } from '../models/device';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  url: string = 'https://localhost:5001/device';

  constructor(private http: HttpClient) { }

  getDevices(): Observable<Device[]> {
    return this.http.get<Device[]>(`${this.url}`);
  }

  getLonelyDevices(): Observable<Device[]> {
    return this.http.get<Device[]>(`${this.url}/lonely`);
  }
}
