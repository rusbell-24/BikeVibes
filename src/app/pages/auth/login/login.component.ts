import { Component } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { UserRegister } from '../../../models/user-register';

import { Suscripcion } from '../enums/suscripcion';
import { UserService } from '../../../core/services/user/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  model: UserRegister = {username:"",email:"",password:"", suscripcion: Suscripcion.URBAN}
  constructor(private userService: UserService, private router: Router){}

  onSubmit(): void {
    
    const jsonRequest = {
      username: this.model.username,
      password: this.model.password,
    };

    console.log(jsonRequest)
    this.userService.login(jsonRequest).subscribe(
      (response) => {
        console.log('Usuario validado correctamente', response);
        // Redirigir al usuario a la ruta '/rutas' después de la validación exitosa
        this.router.navigate(['/rutas']);
      },
      (error) => {
        console.error('Error en la validación', error);
        alert('Credenciales incorrectas, por favor intenta nuevamente.');
      }
    );
  }
  
}
