import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { ActivitiesService } from '../../services/activities.service';
import { atLeastOneCheckboxValidator } from '../../validators/activities.validator';

@Component({
  selector: 'app-dynamicsurveyform',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './dynamicsurveyform.component.html',
  styleUrl: './dynamicsurveyform.component.css'
})
export class DynamicsurveyformComponent implements OnInit {
  activities: string[] = [];
  submissionSuccess = false;
  selectedActivities: string[] = [];

  surveyForm = this.fb.group({
    activities: this.fb.array([], atLeastOneCheckboxValidator())
  });

  constructor(
    private fb: FormBuilder,
    private activitiesService: ActivitiesService
  ) {}

  ngOnInit() {
    this.activities = this.activitiesService.getActivities();
    this.createCheckboxes();
  }

  get activitiesFormArray() {
    return this.surveyForm.get('activities') as FormArray;
  }

  private createCheckboxes() {
    this.activitiesFormArray.clear();
    
    this.activities.forEach(() => {
      this.activitiesFormArray.push(new FormControl(false));
    });
  }

  onCheckboxChange() {
    this.activitiesFormArray.markAsTouched();
  }

  onSubmit() {
    if (this.surveyForm.invalid) {
      console.log('Form is invalid');
      this.activitiesFormArray.markAsTouched();
      return;
    }

    this.selectedActivities = this.activities.filter((activity, index) => 
      this.activitiesFormArray.at(index).value === true
    );

    this.submissionSuccess = true;
    console.log('Selected activities:', this.selectedActivities);
  }

  onReset() {
    this.surveyForm.reset();
    this.submissionSuccess = false;
    this.selectedActivities = [];
    this.createCheckboxes();
  }
}
