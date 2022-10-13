import { Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import {  Subscription } from 'rxjs';
import { UserService } from '../auth/user.service';
import { Location } from '@angular/common';
import { UserProfile } from '@angular/fire/auth';
import { UiService } from '../shared/ui.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {
  loading
  profileUser
  numberOfTweets
  routeSub:Subscription
  profileUserSub: Subscription;
  flutterNameSub:Subscription;
  userProfile:UserProfile = null;
  profileOwner:boolean = false;

  constructor(
    private userServ:UserService,
    private route:ActivatedRoute,
    private router:Router,
    private location:Location,
    private uiServe:UiService
  ) { }

  ngOnInit(): void {
    this.uiServe.navBannerHide()
    this.loading = true
    this.routeSub = this.route.params
      .subscribe(
        (params:Params) => {
          const currenUserFlutterName = params['id']
            this.profileUserSub = this.userServ.getUserProfilebyFN(currenUserFlutterName)
              .subscribe(user => {
                
                  this.loading = false
                  this.profileUser = user[0]
                  this.profileOwner = this.userServ.doesThisUserOwnThisProfile(user[0]['id'])
                  
              })
      })
  }
  onBack(){
    this.location.back()
  }
  onAddNumberOfTweets(event){
    this.numberOfTweets = event
  }
  
  ngOnDestroy(): void {
    this.routeSub.unsubscribe()
    this.profileUserSub.unsubscribe()
    this.uiServe.navMenuVisable = true;
    this.uiServe.bannerVisable = true;
  }

}
