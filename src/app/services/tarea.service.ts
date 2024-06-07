import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TareaResponse, tarea } from '../models/response/TareaResponse';

@Injectable({
  providedIn: 'root',
})
export class TareaService {
  private baseUrl = 'http://localhost:3000/tareas';

  constructor(private http: HttpClient) {}

  getTareas(): Observable<TareaResponse> {
    return this.http.get<TareaResponse>(this.baseUrl);
  }

  addTarea(nuevaTarea: tarea): Observable<tarea> {
    return this.http.post<tarea>(this.baseUrl, nuevaTarea);
  }

  updateTarea(id: number, tarea: tarea): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, tarea);
  }

  deleteTarea(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
