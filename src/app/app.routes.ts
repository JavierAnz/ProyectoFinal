import { Routes } from '@angular/router';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { ListTareasComponent } from './components/list-tareas/list-tareas.component';
import { LoginComponent } from './components/login/login.component';
import { CrearTareaComponent } from './components/crear-tarea/crear-tarea.component';

export const routes: Routes = [
  { path: '', redirectTo: `login`, pathMatch: 'full' },
  { path: 'crearu', component: CreateUserComponent },
  { path: 'listado', component: ListTareasComponent },
  { path: 'login', component: LoginComponent },
  { path: 'creartarea', component: CrearTareaComponent },
];
