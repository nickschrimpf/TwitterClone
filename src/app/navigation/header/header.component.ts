import { Component, EventEmitter, OnInit, Output} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output()  sidenavToggle = new EventEmitter<void>()
  

  constructor(private authService:AuthService,) { 
  
  }

  ngOnInit(): void {
  }
  logOut(){
    this.authService.logOut()
  }
 
  onToggleSideNav(){
    this.sidenavToggle.emit()
  }

}
