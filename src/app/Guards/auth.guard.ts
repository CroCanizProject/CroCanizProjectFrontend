import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/Services/auth.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth:AuthService,private router:Router){}

  canActivate():boolean{
    if(this.auth.isLoggenIn()){
      return true
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Aún no inicias sesión',
      })
      this.router.navigate(['/']);

      return false;
     
    }
  }
  
}
