import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { datePickerValidator } from '../../validators/date-picker.validator';
import { DatePipe } from '@angular/common';

interface BookingSummary {
  name: string;
  email: string;
  numberOfGuests: number;
  date: string;
  specialRequests?: string;
}

@Component({
  selector: 'app-bookingform',
  standalone: true,
  imports: [ReactiveFormsModule, DatePipe],
  templateUrl: './bookingform.component.html',
  styleUrl: './bookingform.component.css'
})
export class BookingformComponent {
  bookingSummary: BookingSummary | null = null;

  constructor(private fb: FormBuilder) {}

  form = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    numberOfGuests: [1, [Validators.required, Validators.min(1), Validators.max(10)]],
    date: ['', [Validators.required, datePickerValidator()]],
    specialRequests: ['']
  });

  onSubmit() {
    if (this.form.invalid) {
      console.log('Form is invalid');
      return;
    }

    this.bookingSummary = {
      name: this.form.value.name!,
      email: this.form.value.email!,
      numberOfGuests: this.form.value.numberOfGuests!,
      date: this.form.value.date!,
      specialRequests: this.form.value.specialRequests || undefined
    };

    console.log('Booking Summary:', this.bookingSummary);
  }

  onReset() {
    this.form.reset();
    this.form.patchValue({ numberOfGuests: 1 });
    this.bookingSummary = null;
  }
}
