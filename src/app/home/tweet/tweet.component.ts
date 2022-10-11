import { AfterContentInit, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Tweet } from 'src/app/timeline/tweet.model';

@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.css']
})
export class TweetComponent implements OnInit  {
  isLoading = false;
  @Input() tweet:Tweet
  constructor() { }

  ngOnInit(): void {
    this.isLoading = true;
    if(this.tweet){
      this.isLoading = false;
    }
  }
  // ngOnChanges(changes: SimpleChanges): void {
  //   console.log(this.tweet)
  // }
  // ngAfterContentInit(): void {
  //   console.log(this.tweet)
  // }

}
