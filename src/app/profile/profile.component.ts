import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import {  Subscription } from 'rxjs';
import { UserService } from '../auth/user.service';
import { Location } from '@angular/common';
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
  profileOwner = false
  constructor(
    private userServ:UserService,
    private route:ActivatedRoute,
    private router:Router,
    private location:Location
  ) { }

  ngOnInit(): void {
  
    this.profileUser = this.route.snapshot.params['id']
    this.routeSub = this.route.params
      .subscribe((params:Params) => {
          const currenUserFlutterName = params['id']
          this.userServ.getUserProfilebyFN(currenUserFlutterName).subscribe(user => {
            this.profileUser = user[0]
             this.userProfileSub = this.userServ.userProfile.subscribe(user => {
              this.userProfile = user
              if(this.profileUser && this.userProfile){
                if( this.userProfile.id === this.profileUser.id){
                  this.profileOwner = true;
                }
              }
              }
            )
          })
          
        }
      )
    
  }
 
 
  onEdit(){
    console.log(this.profileUser.flutterName)
    this.router.navigate(['editprofile'],{relativeTo:this.route})
  }
  onBack(){
    this.location.back()
  }
  ngOnDestroy(): void {
    this.userProfileSub.unsubscribe()
    this.routeSub.unsubscribe()
  }

}
