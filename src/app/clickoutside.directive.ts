import { Directive ,HostListener} from '@angular/core';

@Directive({
  selector: '[appClickoutside]'
})
export class ClickoutsideDirective {

  constructor() { }

  @HostListener('window:beforeunload', ['$event'])
beforeunloadHandler(event:any) {
    localStorage.clear();
  }
}


