import { Component } from '@angular/core';
import {Invoice} from "../../../../models/invoice";
import {ReceiptService} from "../../../../services/receipt.service";
import {Product} from "../../../../models/product";
import {Location} from "@angular/common";

@Component({
  selector: 'app-form',
  templateUrl: './form-receipt.component.html',
  styleUrls: ['./form-receipt.component.css']
})
export class FormReceiptComponent {
  invoice = new Invoice();

  constructor(private invoiceService: ReceiptService, private router: Location) {}
  goBack(): void {
    this.router.back(); // Replace '/' with the appropriate route to navigate back to.
  }
  generatePDF(action = 'open') {
    this.invoice.InvNo = (Math.random() * 1000).toFixed(0);
    const confirmation = window.confirm('Do you want to save the Invoice information?');
    if (confirmation) {
    this.createNewInvoice(this.invoice);
    this.invoiceService.generatePDF(this.invoice, action);
    } else {
      this.invoiceService.generatePDF(this.invoice, action);
    }
  }

  createNewInvoice(invoiceData: Invoice) {
      this.invoiceService.createInvoice(invoiceData).subscribe({
        next: (invoice) => console.log('Invoice created', invoice),
        error: (error) => console.error('There was an error creating the invoice', error)
      });
  }

  addProduct() {
    this.invoice.products.push(new Product());
  }

  removeProduct(i: number) {
    if (i >= 0 && i < this.invoice.products.length) {
      this.invoice.products.splice(i, 1);
    }
  }

}
