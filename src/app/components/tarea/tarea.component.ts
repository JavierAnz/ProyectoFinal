import { Component, Input } from '@angular/core';
import { tarea } from '../../models/response/TareaResponse';
import { TareaService } from '../../services/tarea.service';
import { ShareServiceTsService } from '../../services/share.service.ts.service';
import { NgStyle } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tarea',
  standalone: true,
  imports: [NgStyle],
  templateUrl: './tarea.component.html',
  styleUrls: ['./tarea.component.css'],
})
export class TareaComponent {
  @Input() tarea: tarea = new tarea();

  constructor(
    private tareaService: TareaService,
    private shareService: ShareServiceTsService,
    private router: Router
  ) {}

  eliminarTarea(id: number) {
    console.log(`this.tareaService.deleteTarea(${id})`);
    this.tareaService.deleteTarea(id).subscribe(() => {
      console.log(`Tarea con id ${id} eliminada`);
      this.shareService.setCurrentTarea(new tarea());
    });
  }

  editarTarea(id: number) {
    this.router.navigate(['/editar', id]);
  }
}
