import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  endpoint = environment.apiUrl + 'api/Empleado/';
  //httpOptions = {};

 
  constructor(private http: HttpClient) { }

  buscarEmpleados(): Observable<any> {
    return this.http.get<any>(
      this.endpoint + 'ObtenerEmpleados'
    );
  }


  agregarEmpleado(values: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post<any>(
      this.endpoint + 'agregarEmpleado',
      JSON.stringify(values)
      , httpOptions
    );
  }

  actualizarEmpleado(values: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.put<any>(
      this.endpoint + 'ActualizarEmpleado',
      JSON.stringify(values),
      httpOptions
    );
  }

  eliminarEmpleado(EmpleadoId: number): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.delete<any>(
      this.endpoint + 'eliminarEmpleado/' + EmpleadoId
    );
  }
}
