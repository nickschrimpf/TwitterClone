import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from '../auth/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {
  profileUser
  routeSub:Subscription
  userProfileSub: Subscription;
  userProfile
  constructor(
    private userServ:UserService,
    private route:ActivatedRoute,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.profileUser = this.route.snapshot.params['id']
    this.routeSub = this.route.params
      .subscribe((params:Params) => {
          const currenUserFlutterName = params['id']
          this.userServ.getUserProfilebyFN(currenUserFlutterName).subscribe(user => {
            this.profileUser = user[0]
            console.log(this.profileUser)
          })
          
        }
      )
    this.userProfileSub = this.userServ.userProfile.subscribe(user => {
      this.userProfile = user
      console.log(this.userProfile)
      }
    )
  }
  onEdit(){
    console.log(this.profileUser.flutterName)
    this.router.navigate([this.profileUser.flutterName+'/editprofile/'])
  }
  ngOnDestroy(): void {
   this.routeSub.unsubscribe()
  }

}
