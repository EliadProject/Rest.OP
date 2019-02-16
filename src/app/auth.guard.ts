import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route} from '@angular/router';
import {Injectable} from '@angular/core';
import {CustomerService} from './user.service';
import { Observable } from 'rxjs';

@Injectable()
export class NeedAuthGuard implements CanActivate {

  constructor(private customerService: CustomerService, private router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<boolean> | Promise<boolean> | boolean {

    
    if (this.customerService.isLogged()) {
      return true;
    }

    // navigate to login page
    this.router.navigate(['/login']);
    return false;
  }
}