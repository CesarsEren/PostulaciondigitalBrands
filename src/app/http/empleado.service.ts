import { Injectable } from "@angular/core";
import { API_URL } from "../app.api";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Empleado } from "../model/empleado.interface";
@Injectable({
  providedIn: "root",
})
export class EmpleadoService {
  constructor(private http: HttpClient) {}

  GetEmpleados(size, page, gender): Observable<any> {
    return this.http.get<Empleado>(
      `${API_URL}/employee?action=read&size=${size}&page=${page}&gender=${gender}`
    );
  }
  PutEmpleado(empleado: Empleado): Observable<any> {
    return this.http.post(`${API_URL}/employee?action=update`, empleado);
  }
  PostEmpleado(empleado: Empleado): Observable<any> {
    return this.http.post(`${API_URL}/employee?action=create`, empleado);
  }

  DeleteEmpleado(empleado: Empleado): Observable<any> {
    return this.http.post(`${API_URL}/employee?action=delete`, empleado);
  }
}
