import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  selectedItems: any = []
  loop: number = 1;
  add: boolean = false;
  productsId: number = 0;

  constructor(private http: HttpClient) { }

  getMenu() {
    return this.http.get("http://localhost:4000/menu")
  }
  setOrderDetails(product: any) {
    product.productQuantity++;
    if (this.loop == 1) {
      this.selectedItems.push(product);
      this.loop++;
    }
    else {
      for (let i = 0; i < this.selectedItems.length; i++) {
        if (this.selectedItems[i].productId == product.productId) {
          this.add = true
          this.productsId = i;
          break;
        }
      }
      if (this.add == true) {
        this.selectedItems[this.productsId].productQuantity += 1;
        this.add = false;
      }
      else {
        this.selectedItems.push(product);
      }
    }
  }
  getOrderDetails() {
    console.warn(this.selectedItems)
    return this.selectedItems;
  }
}
