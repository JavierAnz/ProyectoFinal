import { Routes } from '@angular/router';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { ListTareasComponent } from './components/list-tareas/list-tareas.component';
import { LoginComponent } from './components/login/login.component';
import { CrearTareaComponent } from './components/crear-tarea/crear-tarea.component';
import { BuscarTareaComponent } from './components/buscar-tarea/buscar-tarea.component';
import { EditarTareaComponent } from './components/editar-tarea/editar-tarea.component';

export const routes: Routes = [
  { path: '', redirectTo: `login`, pathMatch: 'full' },
  { path: 'crearu', component: CreateUserComponent },
  { path: 'listado', component: ListTareasComponent },
  { path: 'login', component: LoginComponent },
  { path: 'creartarea', component: CrearTareaComponent },
  { path: 'buscartarea', component: BuscarTareaComponent },
  { path: 'editar/:id', component: EditarTareaComponent },
];
