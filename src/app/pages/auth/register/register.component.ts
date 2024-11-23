import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { UserRegister } from '../../../models/user-register';
import { Suscripcion } from '../enums/suscripcion';
import { RouterModule, Router } from '@angular/router';
import { UserService } from '../../../core/services/user/user.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule,],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  model: UserRegister = {username:"",email:"",password:"", suscripcion: Suscripcion.URBAN};
  constructor(private userService: UserService, private router: Router){}

  suscripciones: any[] = [];

  ngOnInit(){
    for(let item in Suscripcion){
      if(isNaN(Number(item))){
        this.suscripciones.push({text: item, value: Suscripcion[item]});
      }
    }
  }
  
  onSubmit(): void {
    const jsonRequest = {
      username: this.model.username,
      password: this.model.password,
      email: this.model.email,
      userType: this.model.suscripcion

    };

    this.userService.createUser(jsonRequest).subscribe(
      response => {
        alert('¡Usuario creado con éxito!');

        this.router.navigate(['/login']);
      },
      error => {
        alert('Hubo un error al crear el usuario. Intenta nuevamente.');
      }
    );
  }

}
