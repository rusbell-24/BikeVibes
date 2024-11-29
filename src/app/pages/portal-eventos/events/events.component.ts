import { Component, ViewChild } from '@angular/core';
import { DinamicTableComponent } from '../../../shared/dinamic-table/dinamic-table.component';
import { HeaderComponent } from '../../../shared/header/header.component';
import {NavigationComponent} from '../../../shared/navigation/navigation.component';
import { MatDialog } from '@angular/material/dialog';
import { CreateModalComponent } from '../../../shared/create-modal/create-modal.component';
import { UserService } from '../../../core/services/user/user.service';
import { Event } from '../../../models/event';
import { FieldEvent } from '../../../models/field-event';
import { EventService } from '../../../core/services/event/event-service.service';


@Component({
  selector: 'app-events',
  standalone: true,
  imports: [DinamicTableComponent, HeaderComponent, NavigationComponent],
  templateUrl: './events.component.html',
  styleUrl: './events.component.css'
})
export class EventsComponent {

  modelEvent: Event = {userId:"",title:"",detail:"", location: "", price:"", awarding: false};
  events: any[] = [];
  sessionInfo: any;  //
  @ViewChild(NavigationComponent) navigationComponent!: NavigationComponent;

  constructor(
    private dialog: MatDialog,
    private userService: UserService,
    private eventService: EventService
  ) {}

  ngOnInit() {

    const sessionInfo = this.userService.isSessionActive();

    if (sessionInfo.isActive) {
      this.sessionInfo = sessionInfo;
      this.modelEvent.userId = sessionInfo.user.id;
      this.eventService.getEvents(this.modelEvent.userId).subscribe((data: any) => {
        this.events = data;
      });


    if (this.navigationComponent) {
      this.navigationComponent.ngOnInit(); // Ejecuta manualmente ngOnInit del hijo navigationcomponent
    }

    } else {
      console.warn('La sesión no está activa. No se obtendrán las rutas.');
      // Opcionalmente redirige al usuario a otra página
    }

  }

  // Función para abrir el modal de creación del evento
  openCreateEventModal(): void {

    const dialogRef = this.dialog.open(CreateModalComponent, {

      width: '500px',
      data: {
        title: 'Nuevo Evento',
          fields: [
            { name: 'title', label: 'Nombre del evento', type: 'text', value: '' },
            { name: 'detail', label: 'Descripcion del evento', type: 'text', value: '' },
            { name: 'location', label: 'Ubicacion inicial del evento', type: 'text', value: '' },
            { name: 'price', label: 'Premio', type: 'text', value: '' },
            { name: 'awarding', label: 'Incluye premiación', type: 'checkbox', value: '' },
          ],
      },
  });
  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.saveEvent(result);
    }
  });
  }

  // Función que crea la ruta usando la api
  saveEvent(eventData: any): void {

    eventData.forEach((field: FieldEvent) => {
      if (field.name === 'title') {
          this.modelEvent.title = field.value;
      } else if (field.name === 'detail') {
          this.modelEvent.detail = field.value;
      } else if (field.name === 'location') {
          this.modelEvent.location = field.value;
      } else if (field.name === 'price'){
        this.modelEvent.price = field.value;
      } else if (field.name === 'awarding') {
        this.modelEvent.awarding = field.value;
      }
  });

    const jsonRequest = {
      userId: this.modelEvent.userId,
      title: this.modelEvent.title,
      detail: this.modelEvent.detail,
      location: this.modelEvent.location,
      price: this.modelEvent.price,
      awarding: this.modelEvent.awarding,
    };

    this.eventService.createEvent(jsonRequest).subscribe(
      response => {
        alert('Evento creado con éxito!');
        this.eventService.getEvents(this.modelEvent.userId).subscribe((data: any) => {
          this.events = data;
          this.userService.setLocalStorage(this.sessionInfo.user)
        });
      },
      error => {
        alert('Hubo un error al crear el evento. Intenta nuevamente.');
      }
    );

  }

  // Servivio para eliminar un evento
  onDeleteElement(element: any): void {
    console.log("eliminando", element)
    const jsonRequest = {
      userId: this.modelEvent.userId,
      id: element.id
    };

    this.eventService.deleteEvent(jsonRequest).subscribe(
      response => {
        alert('Evento eliminado con éxito!');
        this.eventService.getEvents(this.modelEvent.userId).subscribe((data: any) => {
          this.events = data;
        });
      },
      error => {
        alert('Hubo un error al eliminar evento. Intenta nuevamente.');
      }
    );
  }

  

}
