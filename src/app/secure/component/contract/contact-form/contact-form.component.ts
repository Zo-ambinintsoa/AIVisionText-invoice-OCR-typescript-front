import {Component, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {ContractService} from "../../../../services/contract.service";

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
  constructor(private pdfService: ContractService) { }
  generatePdf() {
    this.pdfService.generatePdf(this.contractDetails, 'open');
  }

  printPdf() {
    this.pdfService.generatePdf(this.contractDetails, 'print');

  }
  onSubmit() {
    if (this.contractForm.valid) {
      const confirmation = window.confirm('Do you want to save the contract information?');
      if (confirmation) {
        this.pdfService.createContract(this.contractDetails).subscribe({
          next: (response) => {
            // Handle the successful response here
            alert('Contract saved successfully.');
          },
          error: (error) => {
            // Handle errors here, e.g., alert the user
            alert('An error occurred while saving the contract.');
          }
        });
      }
    }
  }
  downloadPdf() {
    this.pdfService.generatePdf(this.contractDetails, 'download');
  }
}
