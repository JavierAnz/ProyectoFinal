import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TareaService } from '../../services/tarea.service';
import { tarea } from '../../models/response/TareaResponse';
import { ShareServiceTsService } from '../../services/share.service.ts.service';

@Component({
  standalone: true,
  selector: 'app-editar-tarea',
  templateUrl: './editar-tarea.component.html',
  styleUrls: ['./editar-tarea.component.css'],
  imports: [ReactiveFormsModule],
})
export class EditarTareaComponent implements OnInit {
  @Input() tarea: tarea = new tarea();
  tareaForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private tareaService: TareaService,
    private shareService: ShareServiceTsService
  ) {
    this.tareaForm = this.fb.group({
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
      prioridad: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.tareaForm.patchValue({
      titulo: this.tarea.titulo,
      descripcion: this.tarea.descripcion,
      prioridad: this.tarea.prioridad,
    });
  }

  onSubmit() {
    if (this.tareaForm.valid) {
      const updatedTarea = {
        ...this.tarea,
        ...this.tareaForm.value,
      };

      this.tareaService
        .updateTarea(this.tarea.id, updatedTarea)
        .subscribe(() => {
          console.log(`Tarea con id ${this.tarea.id} actualizada`);
          // Notificar al componente padre para actualizar la lista de tareas
          this.shareService.setCurrentTarea(new tarea()); // Trigger update in parent
        });
    }
  }
}
