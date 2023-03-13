import { Component } from '@angular/core';
import { Menu } from '../Model/menu';
import { MenuService } from '../service/menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  allItems: any = []
  listOfItems: any[] = []
  singleMenu: Menu = { category: '', items: [] }
  vegan: string = "veg"
  loggedInUserDetail: any
  allUserDetails: any
  subTotal: number = 0
  cartItems: any = []
  count: number = 0
  error: string = ""
  product: any = {}
  loop: number = 1;
  add: boolean = false;
  constructor(private menuService: MenuService) {

  }

  ngOnInit() {
    this.getAllMenu();
    this.getCountAndSubtotal();

  }
  getAllMenu() {
    //get all menu details
    this.menuService.getMenu().subscribe(
      {
        next: (data) => {
          this.allItems = data
          this.listOfItems = [];

          for (let i = 0; i < this.allItems.length; i++) {
            //binding category and item data according to the categories
            this.singleMenu.category = this.allItems[i].category
            this.singleMenu.items = this.allItems[i].items
            //adding the required data to show in menu list page
            this.listOfItems.push(this.singleMenu)
            this.singleMenu = { category: '', items: [] }
          }
        },
        error: (error) => {
          this.error = error.error;
          console.log(this.error);
        }
      });
  }
  addToCart(id: number, itemName: string, itemPrice: number, quantity: number) {
    let product = { productId: id, productName: itemName, productPrice: itemPrice, productQuantity: quantity }
    this.menuService.setOrderDetails(product);
    this.getCountAndSubtotal();
  }
  getCountAndSubtotal() {
    //getting count and subtotal of orders placed
    this.count = 0
    this.subTotal = 0
    this.cartItems = this.menuService.getOrderDetails();

    this.count = this.cartItems.length;
    if (this.subTotal > 0) {
      this.subTotal = 0
      for (let i = 0; i < this.cartItems.length; i++) {
        this.subTotal = this.subTotal + this.cartItems[i].productPrice * this.cartItems[i].productQuantity
      }
    }
    else {
      for (let i = 0; i < this.cartItems.length; i++) {
        this.subTotal = this.subTotal + this.cartItems[i].productPrice * this.cartItems[i].productQuantity
        console.warn(this.subTotal)
      }
    }
  }
}

