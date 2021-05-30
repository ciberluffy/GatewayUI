import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Device } from '../models/device';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  url: string = 'https://localhost:5001/device';

  constructor(private http: HttpClient) { }

  getDevices(): Observable<Device[]> {
    return this.http.get<Device[]>(`${this.url}`)
    .pipe(
      catchError((err) => {
        if (err.error instanceof Error) {
          alert(`An error occurred: ${err.error.message}`);
        } else {
          alert(`Error Code ${err.status} \n Errors: ${JSON.stringify(err?.error?.errors ?? err?.error ?? err, null, 2)}`);
        }

        return new Observable<Device[]>();
      })
    );
  }

  getLonelyDevices(): Observable<Device[]> {
    return this.http.get<Device[]>(`${this.url}/lonely`)
    .pipe(
      catchError((err) => {
        if (err.error instanceof Error) {
          alert(`An error occurred: ${err.error.message}`);
        } else {
          alert(`Error Code ${err.status} \n Errors: ${JSON.stringify(err?.error?.errors ?? err?.error ?? err, null, 2)}`);
        }

        return new Observable<Device[]>();
      })
    );
  }

  getDevice(uid: number): Observable<Device> {
    return this.http.get<Device>(`${this.url}/${uid.toString()}`)
    .pipe(
      catchError((err) => {
        if (err.error instanceof Error) {
          alert(`An error occurred: ${err.error.message}`);
        } else {
          alert(`Error Code ${err.status} \n Errors: ${JSON.stringify(err?.error?.errors ?? err?.error ?? err, null, 2)}`);
        }

        return new Observable<Device>();
      })
    );
  }

  postDevice(device: Device): Observable<Device> {
    return this.http.post<Device>(`${this.url}/create`, device)
    .pipe(
      catchError((err) => {
        if (err.error instanceof Error) {
          alert(`An error occurred: ${err.error.message}`);
        } else {
          alert(`Error Code ${err.status} \n Errors: ${JSON.stringify(err?.error?.errors ?? err?.error ?? err, null, 2)}`);
        }

        return new Observable<Device>();
      })
    );
  }
}
