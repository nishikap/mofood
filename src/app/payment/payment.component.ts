import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent {
  
  paymentHandler:any = null;

  constructor() { }

  ngOnInit() {
    this.invokeStripe();
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
      amount: amount * 100
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

}
