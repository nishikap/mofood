import { Component, OnInit } from '@angular/core';
import { ListingService, MenuItem } from '../services/listing.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartItems: MenuItem[] = [];
  totalAmount: number = 0;
  isOrderPlaced: boolean = false;

  constructor(protected listingService: ListingService) { }

  ngOnInit(): void {
    this.cartItems = this.listingService.getCartItems();
    this.getTotalAmount();
  }

  getTotalAmount() {
    this.totalAmount = this.listingService.getTotalAmount();
  }

  placeOrder(){
    this.listingService.placeOrder(this.cartItems);
    this.listingService.cleanCart();
    this.cartItems = [];
    this.isOrderPlaced = true;
  }



}
