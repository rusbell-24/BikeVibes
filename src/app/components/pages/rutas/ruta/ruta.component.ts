import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { HeaderComponent } from '../../../../components/shared/header/header.component';
import {NavigationComponent} from '../../../../components/shared/navigation/navigation.component';
import { DinamicTableComponent } from '../../../../components/shared/dinamic-table/dinamic-table.component';
import { MatDialog } from '@angular/material/dialog';
import { CreateModalComponent } from '../../../../components/shared/create-modal/create-modal.component';
import {UserService} from "../../../../core/services/user/user.service";
import {RouteService} from "../../../../core/services/route/route-service.service";
import { Route } from '../../../../models/route';
import { FieldRoute } from '../../../../models/field-route';
import { UserRegister } from '../../../../models/user-register';


@Component({
  selector: 'app-ruta',
  standalone: true,
  imports: [CommonModule, MatIconModule, HeaderComponent, NavigationComponent, DinamicTableComponent ],
  templateUrl: './ruta.component.html',
  styleUrl: './ruta.component.css'
})
export class RutaComponent implements OnInit {

  modelRoute: Route = {userId:"",title:"",startPoint:"", endPoint: ""};
  routes: any[] = [];
  sessionInfo: any;  //
  @ViewChild(NavigationComponent) navigationComponent!: NavigationComponent;

  constructor(
    private dialog: MatDialog,
    private userService: UserService,
    private routeService: RouteService
  ) {}

  ngOnInit() {

    const sessionInfo = this.userService.isSessionActive();

    if (sessionInfo.isActive) {
      this.sessionInfo = sessionInfo;
      this.modelRoute.userId = sessionInfo.user.id;
      this.routeService.getRoutes(this.modelRoute.userId).subscribe((data: any) => {
        this.routes = data;
      });


    if (this.navigationComponent) {
      this.navigationComponent.ngOnInit(); // Ejecuta manualmente ngOnInit del hijo navigationcomponent
    }

    } else {
      console.warn('La sesión no está activa. No se obtendrán las rutas.');
      // Opcionalmente redirige al usuario a otra página
    }

  }
  

  // Función para abrir el modal de creación de ruta
  openCreateRouteModal(): void {

    const dialogRef = this.dialog.open(CreateModalComponent, {

      width: '500px',
      data: {
          title: 'Nueva Ruta',
          fields: [
              { name: 'title', label: 'Nombre de la Ruta', type: 'text', value: '' },
              { name: 'startPoint', label: 'Punto inicio de referencia', type: 'text', value: '' },
              { name: 'endPoint', label: 'Punto fin referencia', type: 'text', value: '' },
          ],
      },
  });
  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.saveRoute(result);
    }
  });
  }

  // Función que crea la ruta usando la api
  saveRoute(routeData: any): void {

    routeData.forEach((field: FieldRoute) => {
      if (field.name === 'title') {
          this.modelRoute.title = field.value;
      } else if (field.name === 'startPoint') {
          this.modelRoute.startPoint = field.value;
      } else if (field.name === 'endPoint') {
          this.modelRoute.endPoint = field.value;
      }
  });

    const jsonRequest = {
      userId: this.modelRoute.userId,
      title: this.modelRoute.title,
      startPoint: this.modelRoute.startPoint,
      endPoint: this.modelRoute.endPoint
    };

    this.routeService.createRoute(jsonRequest).subscribe(
      response => {
        alert('Ruta creada con éxito!');
        this.routeService.getRoutes(this.modelRoute.userId).subscribe((data: any) => {
          this.routes = data;
          console.log("object", this.sessionInfo)
          this.userService.setLocalStorage(this.sessionInfo.user)
        });
      },
      error => {
        alert('Hubo un error al crear la ruta. Intenta nuevamente.');
      }
    );

  }

  // Método que maneja la eliminación del elemento
  onDeleteElement(element: any): void {
    console.log("eliminando", element)
    const jsonRequest = {
      userId: this.modelRoute.userId,
      id: element.id
    };

    this.routeService.deleteRoute(jsonRequest).subscribe(
      response => {
        alert('Ruta eliminada con éxito!');
        this.routeService.getRoutes(this.modelRoute.userId).subscribe((data: any) => {
          this.routes = data;
        });
      },
      error => {
        alert('Hubo un error al eliminar la ruta. Intenta nuevamente.');
      }
    );
  }
}
