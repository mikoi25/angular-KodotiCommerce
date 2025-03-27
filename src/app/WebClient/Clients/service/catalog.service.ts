import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Product, ProductInStock, ProductItem } from '../interface/catalog.interface';
import { Observable, catchError, of } from 'rxjs';
import { environments } from '../../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {

  private _http = inject(HttpClient);
  private readonly ApiCatalogUrl_product = environments.CatalogUrl + 'v1/products';
  private readonly ApiCatalogUrl_stock = environments.CatalogUrl + 'v1/stocks';

  constructor() { }

  GetAll(): Observable<Product> {

    const params = new HttpParams()
      .set('page', 1)
      .set('take', 100);
    return this._http.get<Product>(`${this.ApiCatalogUrl_product}`, { params });
  }

  GetAllStock(): Observable<ProductInStock> {
    const params = new HttpParams()
      .set('page', 1)
      .set('take', 100);
    return this._http.get<ProductInStock>(`${this.ApiCatalogUrl_stock}`, { params });
  }



  GetById(id: number): Observable<ProductItem> {
    return this._http.get<ProductItem>(`${this.ApiCatalogUrl_product}/${id}`)

  }

  addProduct(product: ProductItem): Observable<ProductItem> {
    return this._http.post<ProductItem>(`${this.ApiCatalogUrl_product}`, product);
  }
}
