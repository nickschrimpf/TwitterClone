import { Component, EventEmitter, OnInit, Output,} from '@angular/core';

import { AuthService } from '../../auth/auth.service';

import { UserService } from 'src/app/auth/user.service';
import { UiService } from 'src/app/shared/ui.service';
import { Subject, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserProfile } from '@angular/fire/auth';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  @Output()  sidenavToggle = new EventEmitter<void>()
  userProfile
  userProfileSub:Subscription
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
     this.userProfileSub = this.userServ.userProfile.subscribe(data => {
      this.userProfile = data
      this.isLoading = false
     })

  }
  ngOnDestroy(){
    this.userProfileSub.unsubscribe()
  }



  logOut(){
    this.authService.logOut()
  }

  onToggleSideNav(){
    this.sidenavToggle.emit()
  }

}
