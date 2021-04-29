import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth-service.service';
import {  ListingService, MenuItem, Restaurant } from '../services/listing.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  restaurant: Restaurant;
  appetizers: MenuItem[] = [];
  entrees: MenuItem[] = [];
  desserts: MenuItem[] = [];
  restaurantId;
  constructor(protected listingService: ListingService, protected route: ActivatedRoute, protected authService: AuthService) { }

  ngOnInit() {
    //read parameters here
    this.route.params.subscribe(params => {
      this.restaurantId = params["id"];
      console.log('restaurant id is', this.restaurantId)
    });

    this.getRestaurant();
  }

  getRestaurant() {
    this.restaurant = this.listingService.getRestaurant(this.restaurantId);
    this.appetizers = this.restaurant.menuItems.filter((item) => item.type === "Appetizer");
    this.entrees = this.restaurant.menuItems.filter((item) => item.type === "Entre");
    this.desserts = this.restaurant.menuItems.filter((item) => item.type === "Dessert");

  }

  addToCart(item: MenuItem){
    this.listingService.currentRestaurant = this.restaurant.id;
    this.listingService.addToCart(item);
  }

  isItemAlreadyInCart(item): boolean{
    return this.listingService.checkIfItemIsAlreadyInCart(item);
  }

}
