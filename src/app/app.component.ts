import { Component } from '@angular/core';
import { BookingformComponent } from './shared/components/bookingform/bookingform.component';
import { DynamicsurveyformComponent } from "./shared/components/dynamicsurveyform/dynamicsurveyform.component";
import { RegisterformComponent } from "./shared/components/registerform/registerform.component";

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [BookingformComponent, DynamicsurveyformComponent, RegisterformComponent],
})
export class AppComponent {}
