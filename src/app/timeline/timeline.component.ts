import { Component, OnInit} from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { TimelineService } from './timeline.service';
import { Tweet } from './tweet.model';




@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})


export class TimelineComponent implements OnInit {
  timeline$:Observable<Tweet[]>
  user:string;
  constructor(private tlService:TimelineService, private auth:AuthService) { }

  ngOnInit(): void {

    this.timeline$ = this.tlService.getTimeline()
    
  }
  

}
