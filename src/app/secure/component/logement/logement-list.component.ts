import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-logement-list',
  templateUrl: './logement-list.component.html',
  styleUrls: ['./logement-list.component.css', '../../../public/public.component.css']
})
export class LogementListComponent implements OnInit {
  logementList: any[] = [];
  showDetails: boolean = false;
  selectedLogement: any = {};

  constructor(private http: HttpClient) {}

  ngOnInit() {
    // Load the list of logements when the component is initialized
    this.loadLogements();
  }

  // Load the list of logements from the JSON server
  loadLogements() {
    this.http.get<any[]>('http://localhost:3000/logements').subscribe(data => {
      this.logementList = data;
    });
  }

  // Function to toggle the visibility of logement details
  toggleLogementDetails(logementId: number): void {
    if (logementId === this.selectedLogement.id) {
      // Toggle the details visibility
      this.showDetails = !this.showDetails;
    } else {
      // If details are not shown, fetch logement details and show them
      this.http.get(`http://localhost:3000/logements/${logementId}`).subscribe(
        (logementDetails: any) => {
          this.selectedLogement = logementDetails;
          this.showDetails = true;
        },
        (error) => {
          console.error('Error fetching logement details', error);
        }
      );
    }
  }

  // Function to delete a logement
  deleteLogement(id: number) {
    const apiUrl = `http://localhost:3000/logements/${id}`;
    this.http.delete(apiUrl).subscribe(
      () => {
        // Success: Logement deleted, you can handle this as needed (e.g., update logementList)
        console.log(`Logement with ID ${id} deleted successfully.`);
        // Reload the list of logements after deletion
        this.loadLogements();
      },
      (error) => {
        // Handle errors here
        console.error(`Error deleting logement with ID ${id}:`, error);
        // You can show an error message or take other actions based on the error.
      }
    );
  }

}
