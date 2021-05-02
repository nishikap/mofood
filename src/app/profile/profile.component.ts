import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth-service.service';
import { ListingService, OrderItem } from '../services/listing.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  activeTab = 'userProfile';
  orders: OrderItem[] = [];
  constructor(
    protected authService: AuthService,
    protected listingService: ListingService
  ) { 
    this.getAllUserOrders();
  }

  ngOnInit(): void {
  }

  changeTab(tabName){
    this.activeTab = tabName;
  }

  getAllUserOrders(){
    this.listingService.populateAllOrders().subscribe((value)=>{
      // console.log('orders are', value, this.authService.userData.uid);
      this.orders = value.filter((order: OrderItem)=> order.userId === this.authService.userData.uid);
      // console.log('user orders are', this.orders);
    });

  }

  signOut(){
    this.authService.SignOut();
  }

  isActive(tabName) {
    if (tabName === this.activeTab) {
      return true;
    }
    return false;
  }

}
