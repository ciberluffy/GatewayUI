import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Gateway } from '../models/gateway';

@Injectable({
  providedIn: 'root'
})
export class GatewayService {
  url: string = 'https://localhost:5001/gateway';

  constructor(private http: HttpClient) { }

  getGateways(): Observable<Gateway[]> {
    return this.http.get<Gateway[]>(`${this.url}`)
    .pipe(
      catchError((err) => {
        if (err.error instanceof Error) {
          alert(`An error occurred: ${err.error.message}`);
        } else {
          alert(`Error Code ${err.status} \n Errors: ${JSON.stringify(err?.error?.errors ?? err?.error ?? err, null, 2)}`);
        }

        return new Observable<Gateway[]>();
      })
    );
  }

  getGatewaysAvailable(): Observable<Gateway[]> {
    return this.http.get<Gateway[]>(`${this.url}/available`)
    .pipe(
      catchError((err) => {
        if (err.error instanceof Error) {
          alert(`An error occurred: ${err.error.message}`);
        } else {
          alert(`Error Code ${err.status} \n Errors: ${JSON.stringify(err?.error?.errors ?? err?.error ?? err, null, 2)}`);
        }

        return new Observable<Gateway[]>();
      })
    );
  }

  postGateway(gateway: Gateway): Observable<Gateway> {
    return this.http.post<Gateway>(`${this.url}/create`, gateway)
        .pipe(
          catchError((err) => {
            if (err.error instanceof Error) {
              alert(`An error occurred: ${err.error.message}`);
            } else {
              alert(`Error Code ${err.status} \n Errors: ${JSON.stringify(err?.error?.errors ?? err?.error ?? err, null, 2)}`);
            }

            return new Observable<Gateway>();
          })
        );
  }
}
