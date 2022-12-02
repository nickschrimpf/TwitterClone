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
  isFollowing:boolean = false;
  userProfile:UserProfile = null;
  profileOwner:boolean = false;

  constructor(
    public userServ:UserService,
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
          console.log(currenUserFlutterName)
            this.profileUserSub = this.userServ.getUserProfilebyFN(currenUserFlutterName)
              .subscribe(user => {
                  this.profileUser = user[0]
                  this.profileOwner = this.userServ.doesThisUserOwnThisProfile(user[0]['id'])
                  this.isFollowing = this.userServ.doesThisUserFollowthisProfile(user[0]['id'])
                  this.loading = false

              })
      })
  }
  onBack(){
    this.location.back();
  }
  onAddNumberOfTweets(event){
    this.numberOfTweets = event;
  }
  onUnfollow(){
    this.userServ.unfollowUser(this.profileUser.id,this.profileUser.followers)
    this.isFollowing = false;
  }
  onFollow(){
    this.userServ.followUser(this.profileUser.id,this.profileUser.followers)
    this.isFollowing = true;
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe()
    this.profileUserSub.unsubscribe()
    this.uiServe.navMenuVisable = true;
    this.uiServe.bannerVisable = true;
  }

}
