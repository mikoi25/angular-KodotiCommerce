
import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, CanMatchFn, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { IdentityService } from '../service/identity.service';

const checkAuthetication = ():boolean  =>{
  if(!localStorage.getItem('Token')){
    inject(Router).navigate(['/auth']);
    return false;
  }else{
    return true;
  }
}
export const canActiveOrder : CanActivateFn  = (route: ActivatedRouteSnapshot,state: RouterStateSnapshot) : boolean | Observable<boolean> =>
{
  return checkAuthetication();
};

export const canMatchOrder :CanMatchFn = (route:Route,segmets:UrlSegment[]): boolean | Observable<boolean> =>
{
  return checkAuthetication();
};

