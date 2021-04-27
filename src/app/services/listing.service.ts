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
    })
  }

  getAllRestaurants() {
    return JSON.parse(sessionStorage.getItem('restaurants'));;
  }

  getRestaurant(restaurantId) {
    // console.log('Inside getRestaurant', Number(restaurantId), this.restaurantData);
    let restaurants: Restaurant[] = JSON.parse(sessionStorage.getItem('restaurants'));
    console.log('Inside getRestaurant', restaurants);
    const restaurant = restaurants.find((restaurant) => restaurant.id === Number(restaurantId));
    return restaurant;
    // return this.restaurantData.filter((restaurant: Restaurant) => { 
    //   restaurant.id === restaurantId
    // });
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