import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PuestoService {

  endpoint = environment.apiUrl + 'api/Puesto/';
  httpOptions = {};

  constructor(private http: HttpClient) { }

  obtenerPuestos(): Observable<any> {
    return this.http.get<any>(
      this.endpoint + 'ObtenerPuestos'
    );
  }
}
