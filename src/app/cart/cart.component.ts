import { Component, OnInit } from '@angular/core';
import { ListingService, MenuItem } from '../services/listing.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartItems: MenuItem[] = [];
  paymentHandler:any = null;
  totalAmount: number = 0;


  constructor(protected listingService: ListingService) { }

  ngOnInit(): void {
    this.cartItems = this.listingService.getCartItems();
    this.invokeStripe();
    this.getTotalAmount();

  }

  makePayment(amount) {
    const paymentHandler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51IfX03L1wnTbIYtMFd6v981EzVr2KvCbN2JHEW2hz57gkfDkPmeBVX0rKXpehiZH99GlrexjgmTldprYqiSb6KWm00UZuKBR1K',
      locale: 'auto',
      token: function (stripeToken: any) {
        console.log(stripeToken)
        alert('Stripe token generated!');
      }
    });
  
    paymentHandler.open({
      name: 'Mofood',
      description: 'Payments',
      amount: amount
    });
  }
  
  invokeStripe() {
    if(!window.document.getElementById('stripe-script')) {
      const script = window.document.createElement("script");
      script.id = "stripe-script";
      script.type = "text/javascript";
      script.src = "https://checkout.stripe.com/checkout.js";
      script.onload = () => {
        this.paymentHandler = (<any>window).StripeCheckout.configure({
          key: 'pk_test_51IfX03L1wnTbIYtMFd6v981EzVr2KvCbN2JHEW2hz57gkfDkPmeBVX0rKXpehiZH99GlrexjgmTldprYqiSb6KWm00UZuKBR1K',
          locale: 'auto',
          token: function (stripeToken: any) {
            console.log(stripeToken)
            alert('Payment has been successfull!');
          }
        });
      }
        
      window.document.body.appendChild(script);
    }
  }

  getTotalAmount(){
    this.totalAmount = this.listingService.getTotalAmount();
  }

}
