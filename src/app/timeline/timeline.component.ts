import { Component, OnDestroy, OnInit} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
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
  timeline$:Observable<Tweet[]>
  user:string;
  userProfileSub:Subscription
  constructor(private tlService:TimelineService, private userServ:UserService) { }

  ngOnInit(): void {
      this.isLoading = true
      this.userProfileSub = this.userServ.userProfile.subscribe(userProfile => {
      if(userProfile){
        this.timeline$ = this.tlService.getTimeline(userProfile.id)
        this.isLoading = false
      }
     })
  }
  ngOnDestroy(){
    this.userProfileSub.unsubscribe()
  }
  

}
