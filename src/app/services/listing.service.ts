import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ListingService {

  restaurantData$;
  constructor(private afs: AngularFirestore) { }

  ngOnInit() {
    console.log('restaurants are', this.restaurantData$);
  }

  async getRestaurantData(){
    // this.afs.collection("restaurants").ref.get().then(data => console.log(data));
    // return this.restaurantData$;
  }

  getMenuItems(){

  }

}
