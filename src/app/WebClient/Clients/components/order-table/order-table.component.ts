import { Component, Input } from '@angular/core';
import { ProductItem } from '../../interface/catalog.interface';

@Component({
  selector: 'webClient-order-table',
  templateUrl: './order-table.component.html',
  styles: ``
})
export class OrderTableComponent {

  @Input()
     product:ProductItem[] =[];

    constructor(){
      console.log(this.product);
    }
}
