import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/auth/user.service';
import { TimelineService } from '../../timeline/timeline.service';
import { TweetService } from '../tweet/tweet.service';


@Component({
  selector: 'app-new-tweet',
  templateUrl: './new-tweet.component.html',
  styleUrls: ['./new-tweet.component.css']
})

export class NewTweetComponent implements OnInit {
  isLoading = false;
  showNewTweet = false;
  showTweetGroup = false;
  tweetForm:UntypedFormGroup;
  tweetDraft = ' ';
  characterCounter = 0;
  progressbar:number;
  userProfile
  userProfileSub
  today = Date.now()
  constructor(private timeline:TimelineService, private userService:UserService , private tweetServ:TweetService) { }

  ngOnInit(): void {
    this.isLoading = true
    this.userProfileSub = this.userService.userProfile.subscribe(userProfile => {
     if(userProfile != null || undefined){
      this.userProfile = userProfile
      this.isLoading = false
     }
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
    this.tweetServ.newTweet({
      tweet:this.tweetForm.value.tweet,
      postOwner:this.userProfile.flutterName,
      ownerID:this.userProfile.id,
      ownerUniqueName:this.userProfile.displayName,
      ownerPhotoURL:this.userProfile.profilePhotoURL,
      replies:[],
      retweets:[],
      likes:[],
      tweetDate:this.today
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
