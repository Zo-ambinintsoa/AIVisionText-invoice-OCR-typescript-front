import { Component } from '@angular/core';

@Component({
  selector: 'app-publish',
  templateUrl: './publish.component.html',
  styleUrls: ['./publish.component.css']
})
export class PublishComponent {
  showDocumentForm: boolean = false;
  showLogementForm: boolean = false;
  showApartmentForm: boolean = false;

  toggleDocumentForm() {
    this.showDocumentForm = !this.showDocumentForm;
    this.showLogementForm = false; // Close other forms
    this.showApartmentForm = false;
  }

  toggleLogementForm() {
    this.showLogementForm = !this.showLogementForm;
    this.showDocumentForm = false; // Close other forms
    this.showApartmentForm = false;
  }

  toggleApartmentForm() {
    this.showApartmentForm = !this.showApartmentForm;
    this.showDocumentForm = false; // Close other forms
    this.showLogementForm = false;
  }
}
