import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function datePickerValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        if (!control.value) {
            return null; // Don't validate empty values, let required validator handle it
        }

        const selectedDate = new Date(control.value);
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Reset time to compare only dates
        
        if (selectedDate < today) {
            return { pastDate: true };
        }
        
        return null;
    };
}
    