import { Component,Input } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../service/login.service';
import { MenuService } from '../service/menu.service';
import { Menu } from '../Model/menu';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  allItems: any = []
  singleMenu: Menu = { category: '', items: [] }
  isLoggedIn: boolean = false
  orderedTime = new Date()
  address: string = ''
  itemId: number = 0
  itemName: string = ''
  itemPrice: number = 0
  amount: number = 0
  subTotal: number = 0
  deliveryCharge: number = 15;
  total: number = 0
  constructor( private loginService: LoginService, private menuService: MenuService, private router: Router) {

  }
  ngOnInit() {
    this.getLogInDetails();
    this.getAddress();
    this.getOrderItems();
  }
  getAddress() {
    this.address = this.loginService.getAddress();
    return this.address;
  }
  getLogInDetails() {
    this.isLoggedIn = this.loginService.getLogInDetails();
    console.warn(this.isLoggedIn);
    return this.isLoggedIn;
  }
  getOrderItems() {
    this.allItems=this.menuService.getOrderDetails();
    console.log(this.allItems)
    for (let i = 0; i < this.allItems.length; i++) {
      this.subTotal += this.allItems[i].productPrice * this.allItems[i].productQuantity;
    }
  }
  reduceItem(productId: number) {
    for (let i = 0; i < this.allItems.length; i++) {
      if (this.allItems[i].productId == productId && this.allItems[i].productQuantity > 1) {
        this.allItems[i].productQuantity -= 1;
      }
      else if (this.allItems[i].productId == productId && this.allItems[i].productQuantity==1) {
        this.allItems.splice(i, 1);
        
      }
      this.calculateSubTotal();
    }
  }
  increaseItem(productId: number) {
    for (let i = 0; i < this.allItems.length; i++) {
      if (this.allItems[i].productId == productId && this.allItems[i].productQuantity >= 1) {
        this.allItems[i].productQuantity += 1;
      }
      this.calculateSubTotal();
    }
  }
  calculateSubTotal(){
    this.subTotal = 0;
      for (let i = 0; i < this.allItems.length; i++){
        this.subTotal += this.allItems[i].productPrice * this.allItems[i].productQuantity;
      }
  }
  back() {
    this.router.navigate(['']);
  }
}





