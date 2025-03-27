 import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { IdentityService } from '../../service/identity.service';
import { User } from '../../interface/identity.interface';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: ``
})
export  class LoginComponent {

  public IdentityService = inject(IdentityService)
  private router = inject(Router);
  isErrorAcesso:boolean = false;


    loginForm = new FormGroup({
      email : new FormControl<string>('',Validators.required),
      password: new FormControl<string>('' ,Validators.required)
    })

    get CurrentLogin():User  {
     const login = this.loginForm.value as User;
     return structuredClone(login);
    }

  onLogin():void {
   this.IdentityService.Authentication(this.CurrentLogin).subscribe(data=>{
      if(data.succeeded){
        this.router.navigate(['/order']);
        localStorage.setItem('Token',data.accessToken);
      }else{
        this.isErrorAcesso =true;
      }
   })
  }
}
