import {Product} from "./product";

export class Invoice {

  customerName!: string;
  address!: string;
  contactNo!: number;
  email!: string;

  products: Product[] = [];
  additionalDetails!: string;

  InvNo?: string;

  constructor() {
    this.products.push(new Product());
  }
}
