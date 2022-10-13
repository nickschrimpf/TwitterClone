import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class UiService {
  navVisable:boolean = true
  constructor(private snackBar:MatSnackBar) { }

  navBarHide(){
    this.navVisable = false;
  }
  navToggle(){
    this.navVisable = !this.navVisable
  }

  showSnackBar(message,action,duration){
    this.snackBar.open(message,action,{duration:duration})
  }
}
