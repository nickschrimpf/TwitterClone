import { Component, DoCheck, EventEmitter, OnInit, Output} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,DoCheck {
  @Output()  sidenavToggle = new EventEmitter<void>()
  
  route
  constructor(private router:Router,private authService:AuthService, private location:Location) { 
    this.route = this.location.path()
  }

  ngOnInit(): void {
  }
  logOut(){
    this.authService.logOut()
  }
  ngDoCheck(): void {
    this.route = this.location.path()
  }
  onToggleSideNav(){
    this.sidenavToggle.emit()
  }

}
