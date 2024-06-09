import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TareaService } from '../../services/tarea.service';
import { tarea } from '../../models/response/TareaResponse';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule],
  selector: 'app-editar-tarea',
  templateUrl: './editar-tarea.component.html',
  styleUrls: ['./editar-tarea.component.css'],
})
export class EditarTareaComponent implements OnInit {
  editForm: FormGroup;
  tareaId: number;

  constructor(
    private fb: FormBuilder,
    private tareaService: TareaService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.editForm = this.fb.group({
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
      prioridad: ['', Validators.required],
    });

    this.tareaId = this.route.snapshot.params['id'];
  }

  ngOnInit() {
    this.tareaService.getTareaById(this.tareaId).subscribe((tarea: tarea) => {
      this.editForm.patchValue({
        titulo: tarea.titulo,
        descripcion: tarea.descripcion,
        prioridad: tarea.prioridad,
      });
    });
  }

  onSubmit() {
    if (this.editForm.valid) {
      const updatedTarea: tarea = {
        id: this.tareaId,
        titulo: this.editForm.get('titulo')?.value,
        descripcion: this.editForm.get('descripcion')?.value,
        prioridad: this.editForm.get('prioridad')?.value,
        fechaCreacion: new Date(),
        estado: '', // Actualiza este campo si es necesario
      };

      this.tareaService.updateTarea(this.tareaId, updatedTarea).subscribe({
        next: (response) => {
          alert('Tarea actualizada correctamente');
          this.router.navigate(['/listado']);
        },
        error: (error) => {
          alert('Error al actualizar la tarea');
        },
      });
    }
  }
}
