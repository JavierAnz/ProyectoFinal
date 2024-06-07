export class TareaResponse {
  Tareas: Array<tarea> = new Array<tarea>();

  constructor(tareas: tarea) {
    this.Tareas = new Array<tarea>();
  }
}

export class tarea {
  id: number = 0;
  titulo: string = '';
  descripcion: string = '';
  prioridad: string = '';
  fechaCreacion: Date = new Date();
  estado: string = '';
}
