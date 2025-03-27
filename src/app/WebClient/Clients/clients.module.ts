import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientsRoutingModule } from './clients-routing.module';




import { LayoutComponent } from './page/layout-page/layout.component';

import { OrderPageComponent } from './page/order-page/order-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrderNewComponent } from './page/order-new/order-new.component';
import { OrderTableComponent } from './components/order-table/order-table.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { OrderDetailsComponent } from './page/order-details/order-details.component';






@NgModule({
  declarations: [
    OrderPageComponent,
    LayoutComponent,
    OrderNewComponent,
    OrderTableComponent,
    LoadingSpinnerComponent,
    OrderDetailsComponent,

],
  imports: [
    CommonModule,
    ClientsRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ClientsModule { }
