import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:5000';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<any> {
    return this.http.get(`${this.baseUrl}/products`);
  }

  getCart(): Observable<any> {
    return this.http.get(`${this.baseUrl}/cart`);
  }

  addToCart(productId: number, quantity: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/cart`, { product_id: productId, quantity });
  }

  checkout(): Observable<any> {
    return this.http.post(`${this.baseUrl}/checkout`, {});
  }
}
