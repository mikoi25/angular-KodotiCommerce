import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { Order, OrderItem, DetailsOrderItem } from '../interface/order.interface';
import { Observable } from 'rxjs';
import { environments } from '../../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private _http = inject( HttpClient);
  private readonly ApiOrderUrl = environments.OrderUrl + 'v1/orders';

  constructor() { }

  GetAll(page?:number):Observable<Order>{
    const params = new HttpParams().set('page',page!).set('take',5);
    return this._http.get<Order>(`${this.ApiOrderUrl}` , { params});
  }

   GetById(id:number):Observable<OrderItem>{
    return this._http.get<OrderItem>(`${this.ApiOrderUrl}/${id}`);
  }

  addOrder(order:OrderItem):Observable<Order>{
    return this._http.post<Order>(`${this.ApiOrderUrl}`,order);
  }



}
