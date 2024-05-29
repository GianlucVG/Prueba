import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../Service/auth.service';
import { HeaderComponent } from "../../components/header/header.component";

@Component({
    selector: 'app-register',
    standalone: true,
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
    imports: [FormsModule, RouterModule, HeaderComponent]
})
export class RegisterComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService) {}

  onSubmit() {
    const user = { email: this.email, password: this.password };
    this.authService.register(user).subscribe(response => {
      console.log('User registered successfully:', response);
    }, error => {
      console.error('Error:', error);
    });
  }
}
