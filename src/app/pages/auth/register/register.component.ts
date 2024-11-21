import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { UserRegister } from '../../../models/user-register';
import { Suscripcion } from '../enums/suscripcion';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  model: UserRegister = {username:"",email:"",password:"", suscripcion: Suscripcion.UrbaniBike};
  constructor(){}

  suscripciones: any[] = [];

  ngOnInit(){
    for(let item in Suscripcion){
      if(isNaN(Number(item))){
        this.suscripciones.push({text: item, value: Suscripcion[item]});
      }
    }
  }

  // refrescar(){
  //   this.model = {username:"",email:"",password:""};
  // }

}
