import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { OrderService } from '../../service/order.service';
import { OrderItem } from '../../interface/order.interface';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styles: ``
})
export class OrderDetailsComponent  implements OnInit{

  private activatedRoute= inject(ActivatedRoute);
  private router = inject(Router);
  private orderServ = inject( OrderService);
  public order? : OrderItem;

  ngOnInit(): void {
   this.activatedRoute.params
     .pipe(
      switchMap( ({id}) => this.orderServ.GetById(id))
     )
     .subscribe( order => {
       if(!order ) return  this.router.navigate(['/order']);

      return this.order = order;
     })
  }



}
