import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EstadoService {

  endpoint = environment.apiUrl + 'api/Estado/';
  httpOptions = {};

  constructor(private http: HttpClient) { }

  obtenerEstados(): Observable<any> {
    return this.http.get<any>(
      this.endpoint + 'ObtenerEstados'
    );
  }
}
