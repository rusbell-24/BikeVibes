import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private location: Location, private router: Router) {}

  goBack(): void {
    this.location.back();
  }

  navigateToCuenta() {
    this.router.navigate(['cuenta']);
  }

  handlerLogout() {
    localStorage.clear();
    this.router.navigate(['/login']).then(() => {
      console.log('Usuario redirigido al login');
    });
  }
}
