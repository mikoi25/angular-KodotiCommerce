import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { loggerInterceptor } from './logger.interceptor';
import { ToastrModule } from 'ngx-toastr';
import { ClickoutsideDirective } from './clickoutside.directive';

@NgModule({
  declarations: [
    AppComponent,
    ClickoutsideDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ToastrModule.forRoot(

    ),
  ],
  providers: [
    provideHttpClient(withInterceptors([
      loggerInterceptor
  ]))
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
