import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class UiService {
  navMenuVisable:boolean = true
  bannerVisable:boolean = true
  constructor(private snackBar:MatSnackBar) { }

  navMenuHide(){
    this.navMenuVisable = false;
  }
  navMenuToggle(){
    this.navMenuVisable = !this.navMenuVisable
  }
  navBannerHide(){
    this.bannerVisable = false;
  }
  navBannerToggle(){
    this.bannerVisable = !this.bannerVisable
  }

  showSnackBar(message,action,duration){
    this.snackBar.open(message,action,{duration:duration})
  }
}
