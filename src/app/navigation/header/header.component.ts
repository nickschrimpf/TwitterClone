import { Component, EventEmitter, OnInit, Output,} from '@angular/core';

import { AuthService } from '../../auth/auth.service';

import { UserService } from 'src/app/auth/user.service';
import { UiService } from 'src/app/shared/ui.service';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  @Output()  sidenavToggle = new EventEmitter<void>()
  userProfile
  userProfileSub:Subscription

  route
  constructor(
    private authService:AuthService,
    public userServ:UserService,
    public uiServ:UiService
    ) {

  }
  ngOnInit(): void {

     this.userProfileSub = this.userServ.userProfile.subscribe(data => {
      console.log(data)
          this.userProfile = data;

     })
  }
  ngOnDestroy(){
    this.userProfileSub.unsubscribe();
  }
  logOut(){
    this.authService.logOut();
  }

  onToggleSideNav(){
    this.sidenavToggle.emit();
  }

}
