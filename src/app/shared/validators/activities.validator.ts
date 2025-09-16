import { AbstractControl, FormArray, ValidationErrors, ValidatorFn } from "@angular/forms";

export function atLeastOneCheckboxValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const formArray = control as FormArray;
        const atLeastOneChecked = formArray.controls.some(ctrl => ctrl.value === true);
        
        return atLeastOneChecked ? null : { atLeastOneRequired: true };
    };
}