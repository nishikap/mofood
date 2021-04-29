import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { AuthService } from './auth-service.service';
import { customAlphabet } from 'nanoid'

@Injectable({
  providedIn: 'root'
})
export class ListingService {

  restaurantData: Restaurant[] = [];
  orders: OrderItem[] = [];
  currentRestaurant: number;
  constructor(private afs: AngularFirestore, private authService: AuthService) {
    this.populateAllData();
  }

  populateAllData() {
    this.restaurantData = [];
    let restaurants = this.afs.firestore.collection(`restaurants`);
    restaurants.get().then((restaurant) => {
      restaurant.forEach((doc: any) => {
        let data = doc.data();
        this.restaurantData.push(data);
      })
      sessionStorage.setItem('restaurants', JSON.stringify(this.restaurantData));
      let cartItems: MenuItem[] = JSON.parse(sessionStorage.getItem('cart'));
      // console.log('cartItems are', cartItems);
      if (!cartItems) {
        sessionStorage.setItem('cart', JSON.stringify([]));
      }
    })
  }

  populateAllOrders() {
    this.orders = [];
    let orders = this.afs.firestore.collection(`orders`);
    orders.get().then((order) => {
      order.forEach((doc: any) => {
        let data = doc.data();
        let docId = doc.id;
        this.orders.push({ ...data, documentId: docId });
      })
      sessionStorage.setItem('orders', JSON.stringify(this.orders));
    })
  }

  getAllOrders() {
    return JSON.parse(sessionStorage.getItem('orders'));;
  }

  getAllRestaurants() {
    return JSON.parse(sessionStorage.getItem('restaurants'));;
  }

  getRestaurant(restaurantId) {
    let restaurants: Restaurant[] = JSON.parse(sessionStorage.getItem('restaurants'));
    // console.log('Inside getRestaurant', restaurants);
    const restaurant = restaurants.find((restaurant) => restaurant.id === Number(restaurantId));
    return restaurant;
  }

  addToCart(item: MenuItem) {
    let cartItems: MenuItem[] = JSON.parse(sessionStorage.getItem('cart'));
    cartItems.push(item);
    // console.log('cartItems are', cartItems);
    sessionStorage.setItem('cart', JSON.stringify(cartItems));
  }

  checkIfItemIsAlreadyInCart(item: MenuItem): boolean {
    // console.log('cartItem is', item);
    let cartItems: MenuItem[] = JSON.parse(sessionStorage.getItem('cart'));
    if (cartItems && cartItems.length > 0) {
      let itemExists = cartItems.find((i) => {
        return i.name === item.name;
      });
      // console.log('does item exist', item, itemExists)
      if (itemExists) {
        return true;
      }
    }
    return false;
  }

  getCartItems(): MenuItem[] {
    return JSON.parse(sessionStorage.getItem('cart'));
  }

  getTotalAmount() {
    let cartItems = JSON.parse(sessionStorage.getItem('cart'));
    let total: number = 0;
    if (cartItems && cartItems.length > 0) {
      cartItems.forEach((item) => total = total + item.price);
    }
    // console.log('total is', total);
    return total;
  }

  placeOrder(cartItems: MenuItem[]) {
    // let cartItems = 
    console.log('Inside PlaceOrder', cartItems);

    const userOrderRef = this.afs.firestore.collection('orders');
    let orderData = this.buildOrderItem(cartItems);
    userOrderRef.doc().set(orderData).then((value) => {
      console.log('successfully added order', value);
    })
  }

  cleanCart() {
    sessionStorage.removeItem('cart');
  }

  buildOrderItem(cartItems: MenuItem[]) {
    return {
      cartItems: cartItems,
      restaurantId: this.currentRestaurant,
      userId: this.authService.userData.uid,
      status: 'active',
      timestamp: new Date(),
      orderNumber: '#' + this.getOrderNumber()
    }
  }

  getOrderNumber(): string {
    let nanoid = customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ', 6);
    return nanoid();
  }

  completeOrder(order) {
    console.log('this.completeOrder', order);
    const userOrderRef = this.afs.firestore.collection('orders');

    userOrderRef.doc(order.documentId).update({
      "status": "completed"
    })
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

export interface OrderItem extends MenuItem {
  status: string;
  cartItems: MenuItem[];
  restaurantId: number;
  userId: string;
  timestamp: Date;
  orderNumber: string;
  documentId?: string;
}