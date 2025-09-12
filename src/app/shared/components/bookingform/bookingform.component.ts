import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { datePickerValidator } from '../../validators/date-picker.validator';

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
  imports: [ReactiveFormsModule],
  templateUrl: './bookingform.component.html',
  styleUrl: './bookingform.component.css'
})
export class BookingformComponent {
  submissionSuccess = false;
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
      this.markAllFieldsAsTouched();
      return;
    }

    // Create booking summary
    this.bookingSummary = {
      name: this.form.value.name!,
      email: this.form.value.email!,
      numberOfGuests: this.form.value.numberOfGuests!,
      date: this.formatDate(this.form.value.date!),
      specialRequests: this.form.value.specialRequests || undefined
    };

    this.submissionSuccess = true;
    console.log('Booking submitted successfully:', this.bookingSummary);
  }

  onReset() {
    this.form.reset();
    this.form.patchValue({ numberOfGuests: 1 }); // Reset to default value
    this.submissionSuccess = false;
    this.bookingSummary = null;
  }

  private markAllFieldsAsTouched() {
    Object.keys(this.form.controls).forEach(key => {
      this.form.get(key)?.markAsTouched();
    });
  }

  private formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
}
