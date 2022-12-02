import { Component, OnInit,Inject } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from 'src/app/auth/user.service';
import { Tweet } from 'src/app/timeline/tweet.model';
import { TweetService } from '../tweet/tweet.service';

@Component({
  selector: 'app-reply',
  templateUrl: './reply.component.html',
  styleUrls: ['./reply.component.css']
})
export class ReplyComponent implements OnInit {
  retweetForm:UntypedFormGroup;
  today = new Date();
  constructor(@Inject(MAT_DIALOG_DATA) public tweet: Tweet,
    public userServ: UserService,
    private tweetServ:TweetService
   ) {}

  ngOnInit(): void {
    console.log(this.tweet)
    this.initForm()
  }

  private initForm(){
    let retweet = "";
    this.retweetForm = new UntypedFormGroup({
      'retweet' : new UntypedFormControl(retweet,Validators.required)
    })
  }
  onSubmit(){
    this.tweetServ.onReply({
      reply:this.retweetForm.value.retweet,
      tweetOwnerID:this.tweet.ownerID,
      tweet:this.tweet.id,
      replyauther:this.userServ.profile.flutterName,
      replyautherId:this.userServ.profile.id,
      replyautherDisplayName:this.userServ.profile.displayName,
      replyautherPhotoURL:this.userServ.profile.profilePhotoURL,
      replyreplies:[],
      replyretweets:[],
      replylikes:[],
      replyDate:this.today
   })
  }

}
