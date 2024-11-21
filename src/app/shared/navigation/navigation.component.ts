import { Component } from '@angular/core';
import { BtnEventFeatureComponent } from "../../features/btn-event-feature/btn-event-feature.component";
import { BtnRoutesFeatureComponent } from "../../features/btn-routes-feature/btn-routes-feature.component";

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [BtnEventFeatureComponent, BtnRoutesFeatureComponent],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent {
  velomaster = true;
}
