import { Component, OnInit, inject, signal } from '@angular/core';
import { OrderService } from '../../service/order.service';
import { Order, orderPayment, orderStatus } from '../../interface/order.interface';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styles: ``
})
export class OrderPageComponent implements OnInit {

  //Servicios
  private readonly orderService = inject(OrderService);
  //llenar la tabla
  public actionStatus: orderStatus[] = ['Cancel', 'Pending', 'Approved']
  public actionPayment: orderPayment[] = ['CreditCard', 'PayPal', 'BankTransfer'];
  public currentOrders = signal<Order | undefined>(undefined);
  //Validaciones
  public page = signal(1);
  public pages = 0;
  public OrderWasFound = signal(true);
  public isClickedPrevios = signal(true)
  public isClickedNext = signal(false)

  loadOrders(page: number): void {
    if (page <= 0) return;
    this.currentOrders.set(undefined);

    this.orderService.GetAll(page).subscribe({
      next: (itemsOrders) => {
        this.currentOrders.set(itemsOrders);
        this.pages = itemsOrders.pages;
        this.OrderWasFound.set(true);
      },
      error: () => {
        this.OrderWasFound.set(false);
        this.currentOrders.set(undefined);
      }
    })
  }
  ngOnInit(): void {
    this.loadOrders(1);
  }

  previousPage() {
    this.page.update(pag => pag - 1);
    if (this.page() == 1) {
      this.isClickedPrevios.set(true);
    }
    this.loadOrders(this.page());
    if (this.page() < this.pages) { this.isClickedNext.set(false) }


  }

  nextPage() {
    this.page.update(pag => pag + 1);
    if (this.page() > 1) {
      this.loadOrders(this.page());
      this.isClickedPrevios.set(false);
    }
    if (this.page() == this.pages) {
      this.isClickedNext.set(true);
    }

  }




}
