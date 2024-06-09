import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
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
  searchTareas(params: {
    titulo: string;
    prioridad: string;
  }): Observable<tarea[]> {
    let httpParams = new HttpParams();
    if (params.titulo) {
      httpParams = httpParams.set('titulo', params.titulo);
    }
    if (params.prioridad) {
      httpParams = httpParams.set('prioridad', params.prioridad);
    }
    return this.http.get<tarea[]>(`${this.baseUrl}/search`, {
      params: httpParams,
    });
  }

  getTareaById(id: number): Observable<tarea> {
    return this.http.get<tarea>(`${this.baseUrl}/${id}`);
  }
}
