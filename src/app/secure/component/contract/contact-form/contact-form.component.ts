import {Component, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {ContractService} from "../../../../services/contract.service";
import {Location} from "@angular/common";
import {Router} from "@angular/router";

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent {
  @ViewChild('contractForm') contractForm!: NgForm;
  contractDetails = {
    employerName: '',
    employeeName: '',
    jobTitle: '',
    startDate: '',
    salary: '',
    nationalId: '',
    dateOfBirth: ''
  };
  constructor(private pdfService: ContractService, private Location: Location, private router: Router) { }
  generatePdf() {
    if (this.contractForm.valid) {
      const confirmation = window.confirm('Do you want to save the contract information?');
      if (confirmation) {
        this.saveInfo()
        this.pdfService.generatePdf(this.contractDetails, 'open');
      } else {
        this.pdfService.generatePdf(this.contractDetails, 'open');
      }
    }
  }

  printPdf() {
    if (this.contractForm.valid) {
      const confirmation = window.confirm('Do you want to save the contract information?');
      if (confirmation) {
        this.saveInfo()
        this.pdfService.generatePdf(this.contractDetails, 'print');
      } else {
        this.pdfService.generatePdf(this.contractDetails, 'print');
      }
    }
  }
  downloadPdf() {
    const confirmation = window.confirm('Do you want to save the contract information?');
    if (confirmation) {
      this.saveInfo()
      this.pdfService.generatePdf(this.contractDetails, 'download');
    } else {
      this.pdfService.generatePdf(this.contractDetails, 'download');
    }
  }

  saveInfo() {
    this.pdfService.createContract(this.contractDetails).subscribe({
      next: (response) => {
        alert('Contract saved successfully.');
        this.router.navigate(['/document/list']);
      },
      error: (error) => {
        // Handle errors here, e.g., alert the user
        alert('An error occurred while saving the contract.');
      }
    });
  }

  goBack(): void {
    this.Location.back(); // Replace '/' with the appropriate route to navigate back to.
  }
}
