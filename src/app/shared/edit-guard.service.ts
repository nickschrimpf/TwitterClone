import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChild, Router, RouterStateSnapshot, UrlTree, CanActivate } from '@angular/router';
import { relative } from 'path';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { UserService } from '../auth/user.service';

@Injectable({
  providedIn: 'root'
})
export class EditGuardService implements CanActivate , CanActivateChild {

  constructor(private userService:UserService, private router:Router) { }
canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
  return this.userService.userProfile.pipe(take(1),map(user => {
    console.log(user.flutterName)
    console.log(route.parent.url[0].path)
    if(user.flutterName === route.parent.url[0].path){
      console.log('returned true')
      this.router.createUrlTree(['editprofile'])
      console.log(state)
        return true
      }
      return this.router.createUrlTree(['home'])

    }))
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.canActivate(childRoute,state)
  }
}
