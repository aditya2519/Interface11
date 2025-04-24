import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartItems: any[] = [];

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getCart().subscribe({
      next: (data) => {
        this.cartItems = data;
      },
      error: (err) => {
        console.error('Failed to fetch cart:', err);
      }
    });
  }

  checkout() {
    this.api.checkout().subscribe(() => {
      alert('Order placed!');
      this.cartItems = [];
    });
  }
}
