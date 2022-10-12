import { Component, Input, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { UserService } from 'src/app/auth/user.service';
import { TimelineService } from 'src/app/timeline/timeline.service';
import { Tweet } from 'src/app/timeline/tweet.model';

@Component({
  selector: 'app-profile-posts',
  templateUrl: './profile-posts.component.html',
  styleUrls: ['./profile-posts.component.css']
})
export class ProfilePostsComponent implements OnInit {
  @Input() profileID
  isLoading = false;
  tweets:Observable<Tweet[]>
  
  constructor(private tlService:TimelineService, private userServ:UserService) { }


  ngOnInit(): void {
    this.isLoading = true
    this.tweets = this.tlService.getPostsById(this.profileID)
    this.isLoading = false
  }
}
