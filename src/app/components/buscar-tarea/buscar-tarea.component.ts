import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TareaService } from '../../services/tarea.service';
import { tarea } from '../../models/response/TareaResponse';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-buscar-tarea',
  templateUrl: './buscar-tarea.component.html',
  styleUrls: ['./buscar-tarea.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
})
export class BuscarTareaComponent {
  searchForm: FormGroup;
  tareas: tarea[] = [];

  constructor(
    private fb: FormBuilder,
    private tareaService: TareaService,
    private router: Router
  ) {
    this.searchForm = this.fb.group({
      titulo: [''],
      prioridad: [''],
    });
  }

  onSearch() {
    const searchParams = {
      titulo: this.searchForm.get('titulo')?.value,
      prioridad: this.searchForm.get('prioridad')?.value,
    };

    this.tareaService.searchTareas(searchParams).subscribe({
      next: (data) => {
        this.tareas = data;
      },
      error: (error) => {
        console.error('Error al buscar tareas', error);
      },
    });
  }

  irAListado() {
    this.router.navigate(['/listado']);
  }
}
