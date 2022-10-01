import { Injectable } from '@angular/core';

import { UserService } from './user.service';
import {AsyncValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { catchError, map , first} from 'rxjs/operators';
import { Observable , of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UniqueFlutterNameService {

  constructor(private userService:UserService) { }

   isUnique(control:AbstractControl):AsyncValidatorFn {
     return (control:AbstractControl):Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
       return this.userService.isFlutterNameUnique(control.value)
         .pipe(
           map(data => {
           return data ? {forbiddenName:{value:control.value}} :null;
       })
      )
     }
  }
}
