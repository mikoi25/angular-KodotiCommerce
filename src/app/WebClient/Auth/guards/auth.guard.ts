import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, CanMatchFn, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';

import { Observable} from 'rxjs';
const checkAuthentication = ():boolean =>{

  if(!localStorage.getItem('Token')) {
       return true
  }else{
    inject(Router).navigate(['/order'])
    return false
  }
};
export const canActiveAuth : CanActivateFn  = (route: ActivatedRouteSnapshot,state: RouterStateSnapshot) : boolean | Observable<boolean> =>
{
  return checkAuthentication();
};

export const canMatchAuth :CanMatchFn = (route:Route,segmets:UrlSegment[]): boolean | Observable<boolean> =>
{
  return checkAuthentication();
};
