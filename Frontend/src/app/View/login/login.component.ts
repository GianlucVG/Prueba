import { Component } from '@angular/core';
import { AuthService } from '../../Service/auth.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { HeaderComponent } from "../../components/header/header.component"; // Asegúrate de importar RouterModule

@Component({
    selector: 'app-login',
    standalone: true, // Añade RouterModule aquí
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    imports: [FormsModule, HttpClientModule, RouterModule, HeaderComponent]
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {} // Inyectar Router

  onSubmit() {
    const credentials = { email: this.email, password: this.password };
    this.authService.login(credentials).subscribe(response => {
      if (response && response.token) {
        localStorage.setItem('token', response.token); // Guardar el token en localStorage
        this.router.navigate(['/entidades']); // Redirigir a la vista de entidades
      } else {
        console.error('Login failed: No token received');
      }
    }, error => {
      console.error('Error:', error);
    });
  }
}