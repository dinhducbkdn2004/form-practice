import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { passwordsMatchValidator } from '../../../shared/validators/passwords-match.validator';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  constructor(private fb: FormBuilder){}

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    passwords: this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
    },{
      validators: [passwordsMatchValidator('password', 'confirmPassword')]
    }),
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    address: this.fb.group({
      street: ['', [Validators.required]],
      number: ['', [Validators.required]],
      postalCode: ['', [Validators.required]],
      city: ['', [Validators.required]],
    }),
    role: ['student', [Validators.required]],
    acquisition: this.fb.array([false, false, false].map(v => this.fb.control(v))),
    terms: [false, [Validators.requiredTrue]],
  });

  onSubmit() {
    if (this.form.invalid) {
      console.log('Form is invalid');
      return;
    }
      console.log(this.form.value);
  }

  onReset(){
    this.form.reset();
  }
}
