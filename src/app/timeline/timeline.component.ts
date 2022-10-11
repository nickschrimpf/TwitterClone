import {  Component,OnDestroy, OnInit} from '@angular/core';
import { UserProfile } from '@angular/fire/auth';
import {  Observable, Subscription } from 'rxjs';
import { UserService } from '../auth/user.service';
import { TimelineService } from './timeline.service';
import { Tweet } from './tweet.model';




@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})


export class TimelineComponent implements OnInit, OnDestroy {
  isLoading = false;
  tweets:Observable<Tweet[]>
  user:string;
  userProfile
  userProfileSub:Subscription
  constructor(private tlService:TimelineService, private userServ:UserService) { }

  ngOnInit(): void {
    console.log('fired outside!')
    
      this.isLoading = true
     this.userServ.userProfile.subscribe(userProfile => {
        console.log('fired inside!')
        this.tweets = this.tlService.getTimeline(userProfile.id)
        this.userProfile = userProfile
        this.isLoading = false
     })
     console.log(this.userProfile)
      if(this.userProfile){
        this.tweets = this.tlService.getTimeline(this.userProfile.id)
        this.isLoading = false
      }
     
  }

  ngOnDestroy(){
    // this.userProfileSub.unsubscribe()
  }
  

}
