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
  routeSub:Subscription
  profileUserSub: Subscription;
  flutterNameSub:Subscription
  userProfile:UserProfile = null
  profileOwner:boolean = false
  constructor(
    private userServ:UserService,
    private route:ActivatedRoute,
    private router:Router,
    private location:Location,
    private uiServe:UiService
  ) { }

  ngOnInit(): void {
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
              }, (error): void => {
                this.loading = false
                this.uiServe.showSnackBar('User does not exist',undefined,5000)
                this.location.back()
              })
          
          
      })
  }

  onEdit(){
    this.router.navigate(['editprofile'],{relativeTo:this.route})
  }
  onBack(){
    this.location.back()
  }
  ngOnDestroy(): void {
    this.routeSub.unsubscribe()
    this.profileUserSub.unsubscribe()
  }

}
