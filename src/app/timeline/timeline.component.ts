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
  
  constructor(private tlService:TimelineService, private userServ:UserService) { }

  ngOnInit(): void {
    this.isLoading = true
    
  }

  ngOnDestroy(){
    
  }
  

}
