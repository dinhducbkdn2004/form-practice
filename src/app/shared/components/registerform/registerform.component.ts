import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-registerform',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './registerform.component.html',
  styleUrl: './registerform.component.css'
})
export class RegisterformComponent {

  onSubmit(formData: NgForm) {
    console.log(formData.form);
    formData.form.reset();
  }
}
