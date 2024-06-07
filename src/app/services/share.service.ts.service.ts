import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { tarea } from '../models/response/TareaResponse';

@Injectable({
  providedIn: 'root',
})
export class ShareServiceTsService {
  private _currenttarea = new BehaviorSubject<tarea>(new tarea());
  currenttarea = this._currenttarea.asObservable();

  constructor() {}

  setCurrentTarea(tarea: tarea) {
    this._currenttarea.next(tarea);
  }
}
