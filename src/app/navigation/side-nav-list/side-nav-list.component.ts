import { Component, OnInit ,Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { UserProfile } from 'src/app/auth/user-profile.model';

import { User } from 'src/app/auth/user.model';
import { UserService } from 'src/app/auth/user.service';


@Component({
  selector: 'app-side-nav-list',
  templateUrl: './side-nav-list.component.html',
  styleUrls: ['./side-nav-list.component.css']
})
export class SideNavListComponent implements OnInit, OnDestroy {
  @Output() onCloseSidenav = new EventEmitter<void>()
  
  
  userProfile:UserProfile 
  userSub:Subscription; 
  constructor(
    private authService:AuthService, 
    private userService:UserService
  ) { }

  ngOnInit(): void {
   
  this.userSub  = this.userService.userProfile.subscribe(userProfile => {
      this.userProfile = userProfile
    })
  }
  ngOnDestroy(): void {
    this.userSub.unsubscribe()
  }

  onToggleSidenav(){
    this.onCloseSidenav.emit()
  }
  onLogOut(){
    this.authService.logOut();
    this.onCloseSidenav.emit();
  }

}
