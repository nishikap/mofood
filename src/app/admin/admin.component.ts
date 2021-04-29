import { Component, OnInit } from '@angular/core';
import { ListingService, OrderItem } from '../services/listing.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  orders: OrderItem[] = [];
  activeTab = 'activeOrders';
  constructor(protected listingService: ListingService) { }

  ngOnInit(): void {
    this.listingService.populateAllOrders();
    this.orders = this.listingService.getAllOrders();
    this.showActiveOrders();
  }

  showPreviousOrders() {
    this.orders = this.listingService.getAllOrders();
    this.orders = this.orders.filter((order) => {
      return order.status === 'completed'
    })
    this.activeTab = 'previousOrders';
  }

  showActiveOrders() {
    if (this.orders) {
      this.orders = this.listingService.getAllOrders();
      this.orders = this.orders.filter((order) => {
        return order.status === 'active'
      })
    }
    this.activeTab = 'activeOrders';
  }

  completeOrder(order: OrderItem) {
    if (this.orders) {
      this.listingService.completeOrder(order);
      this.listingService.populateAllOrders();
      this.orders = this.listingService.getAllOrders();
      this.showActiveOrders();
    }
  }

  isActive(tabName) {
    if (tabName === this.activeTab) {
      return true;
    }
    return false;
  }

}
