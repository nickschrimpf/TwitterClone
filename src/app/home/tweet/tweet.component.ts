import { Component, Input, OnInit } from '@angular/core';
import { UserService } from 'src/app/auth/user.service';
import { Tweet } from 'src/app/timeline/tweet.model';
import { TweetService } from './tweet.service';
import { MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ReplyComponent } from '../reply/reply.component';
import { profile } from 'console';

@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.css']
})
export class TweetComponent implements OnInit  {
  isLoading = false;
  userProfile
  @Input() tweet:Tweet;
  constructor(private tweetServ:TweetService,private userServ:UserService,public dialog:MatDialog) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.userServ.userProfile.subscribe(data => {
        this.userProfile = data
        if(this.tweet != null && this.userProfile != null){
          this.isLoading = false;
        }
    })

  }

  onReply(tweet){
   const replyDialog = this.dialog.open(ReplyComponent, {
      maxHeight:'100vh',
      maxWidth:'100vw',
      height:'100%',
      width:'100%',
      panelClass:'retweetDialog',
      data:{
        ...tweet

      }

    })
  }
  onRetweet(tweet){
    console.log(tweet)
    this.tweetServ.onRetweet(tweet)
  }
  onTweetLike(tweet){
    this.tweetServ.onTweetLike(tweet)
  }
  onTweetNotLike(tweet){
    this.tweetServ.onNotLikeTweet(tweet)
  }

}
