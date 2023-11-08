import { Component, OnInit } from '@angular/core';
import {ReceiptService} from "../../../services/receipt.service";
import {Invoice} from "../../../models/invoice";

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.css']
})
export class ReceiptComponent implements OnInit {
  invoices: any[] = [];
  total = 0;
  page = 1;
  limit = 10;
  search = '';

  constructor(private invoiceService: ReceiptService) {}

  ngOnInit() {
    this.loadInvoices();
  }

  loadInvoices() {
    const params = { page: this.page, limit: this.limit, search: this.search };
    this.invoiceService.getInvoices(params).subscribe(
      response => {
        this.invoices = response[0];
        this.total = response[1];
      },
      error => {
        console.error('Error fetching invoices', error);
      }
    );
  }

  viewDetails(id: number) {
    this.invoiceService.getInvoiceById(id).subscribe(
      (invoice: Invoice) => { // Temporarily using 'any' to avoid TypeScript errors
        // Convert 'price' of each product from string to number
        invoice.products = invoice.products.map((product: any) => ({
          ...product,
          price: parseFloat(product.price)
        }));

        console.log(invoice);
        this.invoiceService.generatePDF(invoice, 'open');
      },
      (error) => {
        console.error('Error fetching invoice details', error);
        alert('Error fetching invoice details');
      }
    );
  }

  onDelete(id: number) {
    if (confirm('Are you sure you want to delete this invoice?')) {
      this.invoiceService.deleteInvoice(id).subscribe(() => {
        this.loadInvoices(); // Refresh the list after deletion
      });
    }
  }

  changePage(change: number) {
    this.page += change;
    if (this.page < 1) this.page = 1; // Prevent going below page 1
    if (this.page > Math.ceil(this.total / this.limit)) this.page = Math.ceil(this.total / this.limit); // Prevent going above max page
    this.loadInvoices();
  }

  onSearch() {
    this.page = 1; // Reset to first page for a new search
    this.loadInvoices();
  }
}
