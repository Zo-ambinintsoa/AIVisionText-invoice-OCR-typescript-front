import { Component } from '@angular/core';
import {Invoice} from "../../../../models/invoice";
import {ReceiptService} from "../../../../services/receipt.service";
import {Product} from "../../../../models/product";

@Component({
  selector: 'app-form',
  templateUrl: './form-receipt.component.html',
  styleUrls: ['./form-receipt.component.css']
})
export class FormReceiptComponent {
  invoice = new Invoice();

  constructor(private invoiceService: ReceiptService) {}

  generatePDF(action = 'open') {
    this.invoiceService.generatePDF(this.invoice, action);
  }

  addProduct() {
    this.invoice.products.push(new Product());
  }
}
