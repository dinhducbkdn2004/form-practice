import { Component } from '@angular/core';
import { BookingformComponent } from './shared/components/bookingform/bookingform.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [ BookingformComponent],
})
export class AppComponent {}
