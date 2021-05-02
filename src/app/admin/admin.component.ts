import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ListingService, OrderItem } from '../services/listing.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  orders: OrderItem[] = [];
  activeOrders: OrderItem[] = [];
  previousOrders: OrderItem[] = [];
  activeTab = 'activeOrders';
  orderActionPending: boolean = false;
  constructor(protected listingService: ListingService, protected route: Router) {
    this.loadOrders();
  }

  ngOnInit(): void {

  }

  loadOrders(){
    this.orderActionPending = true;
    this.listingService.populateAllOrders().subscribe((value) => {
      // console.log('order value is', value);
      this.orders = value;
      this.filterOrders();
      this.orderActionPending = false;
    });
  }

  changeTab(tabName){
    this.activeTab = tabName;
  }

  completeOrder(order: OrderItem) {
    this.listingService.completeOrder(order).subscribe((value) => {
      this.orders = value;
      this.orders.find((order2)=> {
        console.log('order found', order);
        return order2.id === order.id;
      });
      this.filterOrders();
    });
  }

  filterOrders() {
    this.activeOrders = this.orders.filter((order) => {
      return order.status === 'active';
    });
    this.previousOrders = this.orders.filter((order) => {
      return order.status === 'completed';
    });
    console.log('activeOrders are', this.activeOrders);
    console.log('previousOrders are', this.previousOrders);
  }

  isActive(tabName) {
    if (tabName === this.activeTab) {
      return true;
    }
    return false;
  }

}
