import { Injectable, inject } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer, CustomerItem } from '../interface/customer.interface';
import { environments } from '../../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private readonly CustomerUrl = environments.CustomerUrl + 'v1/clients';
  private _http = inject( HttpClient);

  constructor() { }

  GetAll():Observable<Customer>{
    const params = new HttpParams()
   .set('page', 1)
   .set('take', 100);
    return this._http.get<Customer>(`${this.CustomerUrl}` ,{params});
  }

   GetById(id:number):Observable<CustomerItem>{
    return this._http.get<CustomerItem>(`${this.CustomerUrl}/${id}`);
  }

  addCustomer(customer:CustomerItem):Observable<CustomerItem>{
    return this._http.post<CustomerItem>(`${this.CustomerUrl}`,customer);
  }
}
