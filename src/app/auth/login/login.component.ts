import { Component, DestroyRef, inject, OnInit} from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { debounceTime, of } from 'rxjs';

function passwordValidator(control: AbstractControl) {
  const value = control.value || '';
  if (value.length < 6) {
    return { tooShort: true };
  }
  if (!/[A-Za-z]/.test(value) || !/\d/.test(value)) {
    return { patternMismatch: true };
  }
  if (value.includes(' ')) {
    return { containsSpace: true };
  }
  return null;
}

function emailIsUnique(control: AbstractControl) {
  const value = control.value || '';
  if (value !== 'test@example.com') {
    return of(null);
  }
  return of({ notUnique: true });
}

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  form = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.email, Validators.required],
      nonNullable: true,
      asyncValidators: [emailIsUnique],
    }),
    password: new FormControl('', {
      validators: [passwordValidator, Validators.required],
      nonNullable: true,
    }),
  });
  private destroyRef = inject(DestroyRef);

  get emailInvalid() {
    return this.form.controls.email.invalid && this.form.controls.email.touched && this.form.controls.email.dirty;
  }

  get passwordInvalid() {
    return this.form.controls.password.invalid && this.form.controls.password.touched && this.form.controls.password.dirty;
  }

  ngOnInit(): void {
    const savedForm = window.localStorage.getItem('loginForm');
    if(savedForm) {
      const loadedForm = JSON.parse(savedForm);
      this.form.patchValue({
        email: loadedForm.email,
      });
    }

    const subscription = this.form.valueChanges.pipe(debounceTime(300)).subscribe({
      next: (value) => {
        window.localStorage.setItem('loginForm', JSON.stringify({email: value.email}));
      },
    });
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  onSubmit() {
    console.log(this.form);
  }
}
