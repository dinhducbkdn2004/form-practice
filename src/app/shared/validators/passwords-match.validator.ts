
import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function passwordsMatchValidator(controlName1: string, controlName2: string) : ValidatorFn{

  return (control: AbstractControl): ValidationErrors | null => {
    const val1 = control.get(controlName1)?.value;
    const val2 = control.get(controlName2)?.value;

    return val1 !== val2 ? { passwordsMismatch: true } : null;
  }
}