// import { afterNextRender, Component, DestroyRef, inject, viewChild } from '@angular/core';
// import { FormsModule, NgForm } from '@angular/forms';
// import { debounceTime } from 'rxjs';

// @Component({
//   selector: 'app-login',
//   imports: [FormsModule],
//   standalone: true,
//   templateUrl: './login.component.html',
//   styleUrl: './login.component.css',
// })
// export class LoginComponent {
//   private form = viewChild.required<NgForm>('form');
//   private destroyRef = inject(DestroyRef);

//   constructor() {
//     const savedFormData = window.localStorage.getItem('loginFormData');
//     if(savedFormData) {
//       const saveEmail = JSON.parse(savedFormData).email;

//       setTimeout(() => {
//         this.form().controls['email'].setValue(saveEmail);
//       }, 1);
//     }

//     afterNextRender(() => {
//       const subscription = this.form()?.valueChanges?.subscribe({
//         next: (value) => {
//           window.localStorage.setItem(
//             'loginFormData',
//             JSON.stringify({ email: value.email })
//           );
//         },
//       });
//       this.destroyRef.onDestroy(() => subscription?.unsubscribe());
//     });
//   }

//   onSubmit(formData: NgForm) {
//     const enteredEmail = formData.form.value.email;
//     const enteredPassword = formData.form.value.password;

//     console.log(enteredEmail, enteredPassword);
//     console.log(formData.form);
//     formData.form.reset();
//   }
// }
