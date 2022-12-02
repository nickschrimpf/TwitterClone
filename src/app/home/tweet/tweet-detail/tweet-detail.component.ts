import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import {  Subscription } from 'rxjs';
import { Tweet } from 'src/app/timeline/tweet.model';
import { TweetService } from '../tweet.service';

@Component({
  selector: 'app-tweet-detail',
  templateUrl: './tweet-detail.component.html',
  styleUrls: ['./tweet-detail.component.css']
})
export class TweetDetailComponent implements OnInit, OnDestroy{
  tweetDetail
  routeSub:Subscription;
  constructor(
    private route:ActivatedRoute,
    private tweetServ:TweetService
    ) { }

  ngOnInit(): void {
   this.routeSub = this.route.params
      .subscribe((params:Params) => {
        this.tweetServ.onGetTweet(params['tweetid'])
        .subscribe({
          next:value => this.tweetDetail = value,
          complete: () => console.log('completed')
        })
      })
  }
  ngOnDestroy(): void {
    this.routeSub.unsubscribe()
  }

}
