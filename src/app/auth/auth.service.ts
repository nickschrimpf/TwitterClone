import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

import { Router } from '@angular/router';
import { timeStamp } from 'console';
import { Subject } from 'rxjs';
import { UiService } from '../shared/ui.service';
import { AuthData } from './auth-data.model';
import { User } from './user.model';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  authChange = new Subject<boolean>()
  

  isLoggedIn:boolean = false;
  


  constructor(
    private router:Router,
    private afAuth:AngularFireAuth,
    private uiService:UiService,
    private userService:UserService,
  ) { }

  initAuthListener(){
    this.afAuth.authState.subscribe(user => {
      if(user){
        this.userService.getCurrentUser();
        this.isLoggedIn = true;
        this.authChange.next(true);
       
      }else{
        this.isLoggedIn = false;
        this.authChange.next(false);
        this.userService.currentUser.next(null)
        this.router.navigate(['/welcome'])
      }
    })
  }

  createNewUser(signUpdata:AuthData){
    this.afAuth.createUserWithEmailAndPassword(signUpdata.email,signUpdata.password).then(result => {  
       this.isLoggedIn = true;
       this.userService.createProfile(signUpdata)
       this.router.navigate(['/welcome/signupstep'])
    }).catch(error=>{
      this.uiService.showSnackBar(error.message,undefined,7000)
    })
  }

  login(loginData:any){ 
    console.log(loginData)
    this.afAuth.signInWithEmailAndPassword(loginData.email,loginData.password).then(result => {
      this.userService.getCurrentUser()
      this.router.navigate(['/home/timeline'])
    }).catch(error => {
      this.uiService.showSnackBar(error.message,undefined,7000)
    })
  }

  logOut(){
    this.afAuth.signOut();
    this.isLoggedIn = false;
    this.userService.currentUser.next(null)
    this.authChange.next(false);
    this.router.navigate(['/welcome'])
  }




}
