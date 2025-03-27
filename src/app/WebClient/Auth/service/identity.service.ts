import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, map, of, switchMap, tap } from 'rxjs';
import { User,Token } from '../interface/identity.interface';
import { environments } from '../../../environments/environments';
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class IdentityService {

  private _http = inject( HttpClient);
  public  router = inject(Router);
  private readonly IdentityUrl = environments.IdentityUrl;

    //Authentication
    public Authentication(form:User):Observable<Token>{
      return this._http.post<Token>(`${ this.IdentityUrl}v1/identity/authentication`, form);
    }
    //Create User
    public OnPost(form:User) :Observable<User>{
      return this._http.post<User>(`${this.IdentityUrl}v1/identity`,form);
    }

}
