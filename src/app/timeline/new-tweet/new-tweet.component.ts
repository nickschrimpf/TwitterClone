import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, NgForm, Validators } from '@angular/forms';
import { UserService } from 'src/app/auth/user.service';
import { TimelineService } from '../timeline.service';
// import {ThemePalette} from '@angular/material/core';
// import {ProgressSpinnerMode} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-new-tweet',
  templateUrl: './new-tweet.component.html',
  styleUrls: ['./new-tweet.component.css']
})

export class NewTweetComponent implements OnInit {
  showNewTweet = false;
  showTweetGroup = false;
  tweetForm:UntypedFormGroup;
  tweetDraft = ' ';
  characterCounter = 0;
  progressbar:number;
  userProfile
  userProfileSub

  constructor(private timeline:TimelineService, private userService:UserService) { }

  ngOnInit(): void {
    this.userProfileSub = this.userService.userProfile.subscribe(userProfile => {
      this.userProfile = userProfile
    })
    this.initForm()

    this.tweetForm.get('tweet').valueChanges.subscribe(tweet =>{
      this.tweetDraft = tweet;
      if(tweet){
        this.characterCounter = this.tweetDraft.length
      }
      this.progressbar = (100 * this.characterCounter) / 180
    })
  }

  private initForm(){
    let tweet = "";
    this.tweetForm = new UntypedFormGroup({
      'tweet' : new UntypedFormControl(tweet,Validators.required)
    })
  }

  onSubmit(){
    this.timeline.newTweet({
      tweet:this.tweetForm.value.tweet,
      auther:this.userProfile.flutterName,
      autherId:this.userProfile.id,
      autherDisplayName:this.userProfile.displayName,
      autherPhotoURL:this.userProfile.profilePhotoURL,
      replies:[],
      retweets:[],
      likes:[],
  })
    this.showNewTweet = false;
    this.showTweetGroup = false;
    this.characterCounter = 0
    this.tweetForm.reset();
  }

  toggleNewTweet(){
    this.showNewTweet = !this.showNewTweet
  }
  onDestroy(){
    this.userProfileSub.unsubscribe()
  }

}
