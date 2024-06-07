import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TareaService } from '../../services/tarea.service';
import { tarea } from '../../models/response/TareaResponse';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-crear-tarea',
  templateUrl: './crear-tarea.component.html',
  styleUrls: ['./crear-tarea.component.css'],
  imports: [ReactiveFormsModule],
})
export class CrearTareaComponent {
  tareaForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private tareaService: TareaService,
    private router: Router
  ) {
    this.tareaForm = this.fb.group({
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
      prioridad: ['', Validators.required],
    });
  }

  irAListado() {
    this.router.navigate(['/listado']);
  }

  onSubmit() {
    if (this.tareaForm.valid) {
      const nuevaTarea: tarea = {
        id: 0,
        titulo: this.tareaForm.get('titulo')?.value,
        descripcion: this.tareaForm.get('descripcion')?.value,
        prioridad: this.tareaForm.get('prioridad')?.value,
        fechaCreacion: new Date(),
        estado: '',
      };

      console.log(nuevaTarea);

      this.tareaService.addTarea(nuevaTarea).subscribe({
        next: (response) => {
          alert('Tarea creada correctamente');
          this.tareaForm.reset();
        },
        error: (error) => {
          alert('Error al crear la tarea');
          this.tareaForm.reset();
        },
      });
    }
  }
}
