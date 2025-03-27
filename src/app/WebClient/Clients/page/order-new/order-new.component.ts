import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { Product, ProductInStockItem, ProductItem } from '../../interface/catalog.interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OrderItem, DetailsOrderItem, OrderPayment, OrderStatus } from '../../interface/order.interface';
import { CatalogService } from '../../service/catalog.service';
import { CustomerService } from '../../service/customer.service';
import { CustomerItem } from '../../interface/customer.interface';

import { OrderService } from '../../service/order.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { elementAt, map } from 'rxjs';


@Component({
  selector: 'app-order-new',
  templateUrl: './order-new.component.html',
  styles: ``
}) export class OrderNewComponent implements OnInit {

  private readonly productService = inject(CatalogService);
  private readonly customerService = inject(CustomerService);
  private readonly orderService = inject(OrderService);
  private router = inject(Router);
  private toastr = inject(ToastrService)



  public products: ProductItem[] = []; //llamar tdolos products
  public productInStock: ProductInStockItem[] = [];
  public orderDetails: DetailsOrderItem[] = []; //llamar tdolos products
  private orderItem!: OrderItem
  public customers: CustomerItem[] = []; //llamar todos customer
  public isLoading: boolean = false;
  private productsIds: number[] = [];
  public error: boolean = false;


  ngOnInit(): void {
    this.productService.GetAll().subscribe(data => { this.products = data.items; });
    this.productService.GetAllStock().subscribe(data => {
      this.productInStock = data.items
    });
    this.customerService.GetAll().subscribe(data => { this.customers = data.items });

  }

  //Formulario Reactivo
  public orderForm = new FormGroup({
    paymentType: new FormControl<OrderPayment>(OrderPayment.PayPal),
    clientId: new FormControl(),
    productId: new FormControl(),
    unitPrice: new FormControl(),

  })

  get currentOrder() {
    const orderItem = this.orderForm.value;
    return structuredClone(orderItem);
  }

  public paymentType = [
    { id: 0, desc: 'CreditCard' },
    { id: 1, desc: 'PayPal' },
    { id: 2, desc: 'BankTransfer' },
  ];
  //agregar productos orderDetails
  addItem() {
    console.log(this.currentOrder);
    const productId = this.productsIds.find((element) => {
      return element == this.currentOrder.productId
    });
    if (this.currentOrder.productId == productId) {
      return;
    } else {

      let product: ProductItem = this.products.find(x => x.productId == this.currentOrder.productId)!

      const stock = this.productInStock.filter(function (element) {
        return element.productId == product.productId;
      });

      if (stock[0].stock == 0) {
        this.error = true;
        return;
      }

      let orderDetail: DetailsOrderItem =
      {
        productId: this.currentOrder.productId,
        name: product.name,
        quantity: 1,
        price: product.price
      }
      this.error = false;
      this.orderDetail(orderDetail)
      console.log("stock", stock)

    }
  }

  removeItem(id: number) {
    this.orderDetails = this.orderDetails.filter(x => x.productId !== id);
    this.productsIds = this.productsIds.filter((item) => {
      return item !== id
    })
    console.log("Array Modificado", this.productsIds);
  }

  save(): void {
    debugger;
    let orderitem: OrderItem = {
      // status: 1,
      paymentType: this.currentOrder.paymentType!,
      clientId: this.currentOrder.clientId,
      items: this.orderDetails,
      // total: this.total()
    }
    console.log("orderITem", orderitem);

    this.orderService.addOrder(orderitem).subscribe({
      next: () => {
        this.router.navigate(['/order']);
      },
      error: () => {
        this.router.navigate(['/order/new-order']);
      }
    })
  }

  total(): number {
    let total = 0;

    this.orderDetails.forEach(x => total += x.price! * x.quantity);

    return total;
  }

  orderDetail(orderDetail: DetailsOrderItem) {

    this.orderDetails.push({
      productId: orderDetail.productId,
      quantity: orderDetail.quantity,
      name: orderDetail.name,
      price: orderDetail.price,
    })

    this.productsIds = this.orderDetails.map(item => item.productId);
    console.log("Array Original", this.productsIds);

  }

  // removeItemOnce(arr: number[], value: number) {
  //   var index = arr.indexOf(value);
  //   if (index > -1) {
  //     arr.splice(index, 1);
  //   }
  //   return arr;
  // }

  // arrayNoRepetidos(ids: number[]): number[] {
  //   return Array.from(new Set(ids));
  // }


}


