import { Component } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { UserRegister } from '../../../../models/user-register';
import { Suscripcion } from '../enums/suscripcion';
import { UserService } from '../../../../core/services/user/user.service';

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

    this.userService.login(jsonRequest).subscribe(
      (response) => {
        this.router.navigate(['rutas']);
      },
      (error) => {
        alert('Credenciales incorrectas, por favor intenta nuevamente.');
      }
    );
  }
  
}
