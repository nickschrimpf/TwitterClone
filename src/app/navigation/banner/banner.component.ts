import { Component, DoCheck, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit, DoCheck {
  @Output() sidenavToggle = new EventEmitter<void>()
  route
  constructor(private authService:AuthService, private location:Location) { }

  ngOnInit(): void {
    this.route = this.location.path()
  }
  logOut(){
    this.authService.logOut()
  }
  ngDoCheck(): void {
    this.route = this.location.path()
    console.log(this.route)
  }
  onBack(){
    this.location.back()
  }
  onToggleSideNav(){
    this.sidenavToggle.emit()
  }

}
