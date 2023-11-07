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
    this.invoiceService.generatePDF(this.invoice, action);
  }

  addProduct() {
    this.invoice.products.push(new Product());
  }
}
