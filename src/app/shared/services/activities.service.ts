import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ActivitiesService {
  private activities = ['Hiking', 'Cycling', 'Swimming'];

  getActivities(): string[] {
    return this.activities;
  }
}