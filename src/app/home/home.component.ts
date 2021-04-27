import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { AuthService } from '../services/auth-service.service';
import { ListingService, Restaurant } from '../services/listing.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  restaurantsListControl = new FormControl();
  options: string[] = [];
  filteredOptions: Observable<string[]>;

  restaurants: Restaurant[];

  constructor(protected router: Router, protected authService: AuthService, protected listingService: ListingService) { }

  ngOnInit() {
    this.filteredOptions = this.restaurantsListControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );

    this.restaurants = this.listingService.getAllRestaurants();
    this.restaurants.forEach((restaurant) => {
      this.options.push(restaurant.name);
    });
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  viewMenu(restaurantId) {
    this.router.navigateByUrl(`/menu/${restaurantId}`);
  }

  isLoggedIn() {
    return this.authService.isLoggedIn;
  }

}
