import { Component, OnInit } from '@angular/core';
import { TareaService } from '../../services/tarea.service';
import { ShareServiceTsService } from '../../services/share.service.ts.service';
import { TareaResponse, tarea } from '../../models/response/TareaResponse';
import { TareaComponent } from '../tarea/tarea.component';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-list-tareas',
  standalone: true,
  templateUrl: './list-tareas.component.html',
  styleUrls: ['./list-tareas.component.css'],
  imports: [TareaComponent],
})
export class ListTareasComponent implements OnInit {
  respuesta: TareaResponse = new TareaResponse(new tarea());

  constructor(
    private tareaService: TareaService,
    private shareService: ShareServiceTsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getTareas();
    this.shareService.currenttarea.subscribe(() => {
      this.getTareas();
    });
  }

  getTareas() {
    this.tareaService.getTareas().subscribe((data) => {
      this.respuesta = data;
    });
  }

  trackById(index: number, item: tarea): number {
    return item.id;
  }

  irACrearT() {
    this.router.navigate(['creartarea']); // Navega a la página de registro
  }
  irABuscarT() {
    this.router.navigate(['buscartarea']); // Navega a la página de búsqueda
  }
}
