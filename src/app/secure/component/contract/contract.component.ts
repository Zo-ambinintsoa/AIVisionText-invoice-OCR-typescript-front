import {Component, ViewChild} from '@angular/core';
import {ContractService} from "../../../services/contract.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.css']
})
export class ContractComponent {

  contracts: any[] = [];
  total = 0;
  page = 1;
  limit = 10;
  search = '';

  constructor(private contractService: ContractService, ) {}

  ngOnInit() {
    this.loadContracts();
  }



  viewDetails(id: number) {
    this.contractService.getContractById(id).subscribe(
      (contract) => {
      this.contractService.generatePdf(contract, 'open');
      },
      (error) => {
        console.error('Error fetching contract details', error);
        alert('Error fetching contract details');
      }
    );
  }

  loadContracts() {
    this.contractService.getContracts({ page: this.page, limit: this.limit, search: this.search }).subscribe(
      data => {
        this.contracts = data[0];
        this.total = data[1]; // Assuming the backend returns total count as the second element
      },
      error => {
        console.error('Error fetching contracts', error);
      }
    );
  }

  onDelete(id: number) {
    const confirmation = confirm('Are you sure you want to delete this contract?');
    if (confirmation) {
      this.contractService.deleteContract(id).subscribe(() => {
        this.loadContracts(); // Refresh the list after deletion
      });
    }
  }

  changePage(change: number) {
    this.page += change;
    this.loadContracts();
  }

// Call this method when the search button is clicked
  onSearch() {
    this.page = 1; // Reset to first page for a new search
    this.loadContracts();
  }
}
