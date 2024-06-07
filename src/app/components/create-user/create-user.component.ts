import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/response/UsuarioResponse';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.css',
})
export class CreateUserComponent {
  usuarioForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router
  ) {
    this.usuarioForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.usuarioForm.valid) {
      const nuevoUsuario: Usuario = {
        id: 0,
        email: this.usuarioForm.get('email')?.value,
        username: this.usuarioForm.get('username')?.value,
        password: this.usuarioForm.get('password')?.value,
      };

      console.log(nuevoUsuario);

      this.usuarioService.addUsuario(nuevoUsuario).subscribe({
        next: (response) => {
          alert('Usuario creado correctamente');
          this.router.navigate(['/login']);
          this.usuarioForm.reset();
        },
        error: (error) => {
          console.error('Error al crear el usuario', error);
        },
      });
    }
  }
}
