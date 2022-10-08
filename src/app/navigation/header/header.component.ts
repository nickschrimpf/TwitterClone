import { Component, EventEmitter, OnInit, Output} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { Location } from '@angular/common';
import { UserService } from 'src/app/auth/user.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output()  sidenavToggle = new EventEmitter<void>()
  userProfile
  isLoading = false

  constructor(private authService:AuthService,private userServ:UserService) { 
  
  }

  ngOnInit(): void {
    this.isLoading = true
    this.userServ.userProfile.subscribe(data => {
      this.userProfile = data;
      this.isLoading = false;
    })
  }

  logOut(){
    this.authService.logOut()
  }
 
  onToggleSideNav(){
    this.sidenavToggle.emit()
  }

}
