import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl : './layout.component.css'
})
export class LayoutComponent {

  public customDate:Date =new Date();
  private router = inject( Router);

  logout(){
    localStorage.clear();
    this.router.navigate(['/auth'])
  }
}
