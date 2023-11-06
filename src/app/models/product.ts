export class Product {
  name!: string;
  price!: number;
  qty!: number;

  get total(): number {
    return this.price * this.qty;
  }
}
