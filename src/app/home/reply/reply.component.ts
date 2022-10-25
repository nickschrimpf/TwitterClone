import { Component, OnInit,Inject } from '@angular/core';
import { MatDialog, MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Tweet } from 'src/app/timeline/tweet.model';

@Component({
  selector: 'app-reply',
  templateUrl: './reply.component.html',
  styleUrls: ['./reply.component.css']
})
export class ReplyComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public tweet: Tweet) {}

  ngOnInit(): void {
    console.log(this.tweet)
  }



}
