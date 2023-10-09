import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-apartment',
  templateUrl: './apartment.component.html',
  styleUrls: ['./apartment.component.css']
})
export class ApartmentComponent implements OnInit {
  apartmentList: any[] = [];
  showDetails: boolean = false;
  selectedApartment: any = {};

  constructor(private http: HttpClient) {}

  ngOnInit() {
    // Load the list of apartments when the component is initialized
    this.loadApartments();
  }

  // Load the list of apartments from the JSON server
  loadApartments() {
    this.http.get<any[]>('http://localhost:3000/apartments').subscribe(data => {
      this.apartmentList = data;
    });
  }


  // Function to handle when a row is clicked
  onRowClick(apartmentId: number): void {
    if (apartmentId === this.selectedApartment.id) {
      // Toggle the details visibility
      this.showDetails = !this.showDetails;
    } else {
      // If details are not shown, fetch apartment details and show them
      this.http.get(`http://localhost:3000/apartments/${apartmentId}`).subscribe(
        (apartmentDetails: any) => {
          this.selectedApartment = apartmentDetails;
          this.showDetails = true;
        },
        (error) => {
          console.error('Error fetching apartment details', error);
        }
      );
    }
  }

  // Function to delete an apartment
  deleteApartment(id: number) {
    const apiUrl = `http://localhost:3000/apartments/${id}`;
    this.http.delete(apiUrl).subscribe(
      () => {
        // Success: Apartment deleted, you can handle this as needed (e.g., update apartmentList)
        console.log(`Apartment with ID ${id} deleted successfully.`);
        // Reload the list of apartments after deletion
        this.loadApartments();
      },
      (error) => {
        // Handle errors here
        console.error(`Error deleting apartment with ID ${id}:`, error);
        // You can show an error message or take other actions based on the error.
      }
    );
  }
}
