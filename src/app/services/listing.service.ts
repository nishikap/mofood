import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ListingService {

  restaurantData: Restaurant[] = [];
  constructor(private afs: AngularFirestore) {
    this.populateAllData();
  }

  populateAllData() {
    let restaurants = this.afs.firestore.collection(`restaurants`);
    restaurants.get().then((restaurant) => {
      restaurant.forEach((doc: any) => {
        let data = doc.data();
        this.restaurantData.push(data);
      })
      sessionStorage.setItem('restaurants', JSON.stringify(this.restaurantData));
      let cartItems: MenuItem[] = JSON.parse(sessionStorage.getItem('cart'));
      if(!cartItems && cartItems.length < 0){
        sessionStorage.setItem('cart', JSON.stringify([]));
      }
    })
  }

  getAllRestaurants() {
    return JSON.parse(sessionStorage.getItem('restaurants'));;
  }

  getRestaurant(restaurantId) {
    let restaurants: Restaurant[] = JSON.parse(sessionStorage.getItem('restaurants'));
    console.log('Inside getRestaurant', restaurants);
    const restaurant = restaurants.find((restaurant) => restaurant.id === Number(restaurantId));
    return restaurant;
  }

  addToCart(item: MenuItem) {
    let cartItems: MenuItem[] = JSON.parse(sessionStorage.getItem('cart'));
    cartItems.push(item);
    console.log('cartItems are', cartItems);
    sessionStorage.setItem('cart', JSON.stringify(cartItems));
  }

  checkIfItemIsAlreadyInCart(item: MenuItem): boolean {
    console.log('cartItem is', item);
    let cartItems: MenuItem[] = JSON.parse(sessionStorage.getItem('cart'));
    let itemExists = cartItems.find((i) => i.name === item.name);
    console.log('does item exist', item, itemExists)
    if (itemExists) {
      return true;
    }
    return false;
  }

  getCartItems(): MenuItem[]{
    return JSON.parse(sessionStorage.getItem('cart'));
  }

  getTotalAmount(){
    let cartItems = JSON.parse(sessionStorage.getItem('cart'));
    let total: number = 0;
    cartItems.forEach((item)=> total = total + item.price);
    console.log('total is', total);
    return total;
  }

}


export interface Restaurant {
  name: string;
  id: number;
  phone: string;
  email: string;
  description: string;
  location: string;
  menuItems: MenuItem[];
  available: boolean;
  deliveryAvailable: boolean;
  pickupAvailable: boolean;
}

export interface MenuItem {
  available: boolean;
  currencyType: string;
  description: string;
  id: number;
  name: string;
  price: number;
  type: string;
}