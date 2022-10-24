import { AfterContentInit, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { UserService } from 'src/app/auth/user.service';
import { Tweet } from 'src/app/timeline/tweet.model';
import { TweetService } from './tweet.service';

@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.css']
})
export class TweetComponent implements OnInit  {
  isLoading = false;
  @Input() tweet:Tweet
  constructor(private tweetServ:TweetService,public userServ:UserService) { }

  ngOnInit(): void {
    this.isLoading = true;
    if(this.tweet){
      this.isLoading = false;
    }
  }

  onTweetLike(tweet){
    this.tweetServ.onTweetLike(tweet)
  }
  onTweetNotLike(tweet){
    this.tweetServ.onNotLikeTweet(tweet)
  }

}
