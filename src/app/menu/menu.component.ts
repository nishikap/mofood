import { Component, OnInit } from '@angular/core';
import { ListingService } from '../services/listing.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  restaurantData$: any;
  constructor(protected listingService: ListingService) { }

  async ngOnInit() {
    await this.getAllRestaurantData();
  }

  async getAllRestaurantData(){
    this.restaurantData$ = await this.listingService.getRestaurantData();
    console.log('this.restaurantData', this.restaurantData$);
  }

}
