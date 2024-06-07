import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule],
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  irARegistro() {
    this.router.navigate(['crearu']); // Navega a la página de registro
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const username = this.loginForm.get('username')?.value;
      const password = this.loginForm.get('password')?.value;

      this.usuarioService.login(username, password).subscribe({
        next: (response) => {
          console.log('Login exitoso', response);
          this.router.navigate(['listado']); // Navega a la página principal o dashboard
        },
        error: (error) => {
          console.error('Error en el login', error);
          alert('Usuario o contraseña incorrectos');
          // Maneja el error, por ejemplo, mostrando un mensaje de error al usuario
        },
      });
    }
  }
}
