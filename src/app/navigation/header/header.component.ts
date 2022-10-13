import { Component, EventEmitter, OnInit, Output,} from '@angular/core';

import { AuthService } from '../../auth/auth.service';

import { UserService } from 'src/app/auth/user.service';
import { UiService } from 'src/app/shared/ui.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  @Output()  sidenavToggle = new EventEmitter<void>()
  userProfile
  isLoading = false
  route
  constructor(
    private authService:AuthService,
    private userServ:UserService,
    public uiServ:UiService
    ) { 
     
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
