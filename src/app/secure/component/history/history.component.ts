import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  activityList: any[] = [];
  showDetails: boolean = false;
  selectedActivity: any = {};
  selectedBefore!: number;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    // Load the list of activities when the component is initialized
    this.loadActivities();
  }

  // Load the list of activities from the JSON server
  loadActivities() {
    this.http.get<any[]>('http://localhost:3000/activities').subscribe(data => {
      this.activityList = data;
    });
  }

  onRowClick(activityId: number): void {
    if (activityId === this.selectedBefore) {
      // Toggle the details visibility
      this.showDetails = !this.showDetails;
      this.selectedBefore = activityId;
    } else {
      // If details are not shown, fetch activity details and show them
      this.http.get(`http://localhost:3000/activities/${activityId}`).subscribe(
        (activityDetails: any) => {
          this.selectedActivity = activityDetails;
          this.selectedBefore = activityId;
          this.showDetails = true;
        },
        (error) => {
          console.error('Error fetching activity details', error);
        }
      );
    }
  }

  toggleButton(activityId: number) {
    if (this.selectedActivity.id === activityId) {
      this.selectedActivity.id = null; // Close the button if it's already open
    } else {
      this.selectedActivity.id = activityId;
    }
  }

  deleteActivity(id: number) {
    const apiUrl = `http://localhost:3000/activities/${id}`;
    this.http.delete(apiUrl).subscribe(
      () => {
        // Success: Activity deleted, you can handle this as needed (e.g., update activityList)
        console.log(`Activity with ID ${id} deleted successfully.`);
        // Reload the list of activities after deletion
        this.loadActivities();
      },
      (error) => {
        // Handle errors here
        console.error(`Error deleting activity with ID ${id}:`, error);
        // You can show an error message or take other actions based on the error.
      }
    );
  }

  // ... Other methods ...

}
