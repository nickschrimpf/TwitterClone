import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { Firestore,
  collectionData, 
  collection, 
  CollectionReference,
  DocumentData, 
} from '@angular/fire/firestore';

import { Observable, Subscribable, Subscription } from 'rxjs';
import { addDoc } from '@firebase/firestore';
import { Tweet } from './tweet.model'
import { UserService } from '../auth/user.service';
import { User } from '../auth/user.model';
import { UserProfile } from '../auth/user-profile.model';

@Injectable({
  providedIn: 'root'
})

export class TimelineService implements OnInit,OnDestroy {
  today:number = Date.now()
  user:User
  userProfile
  ProfileSub:Subscription
  private timeline$ : CollectionReference<DocumentData>

  constructor(private firestore:Firestore, private userServ:UserService) {
    this.timeline$ = collection(this.firestore, 'timeline')
   }

   ngOnInit(): void {
     this.ProfileSub = this.userServ.userProfile.subscribe(userProfile => {
      this.userProfile = userProfile
     })
   }
  
  newTweet(tweet:any){
    return addDoc(this.timeline$, {...tweet,
      tweetDate:this.today,
    })
  }

  getTimeline(){
    return collectionData(this.timeline$,{
      idField:'id',
    }) as Observable<Tweet[]>
  }
  
 ngOnDestroy(){
    this.ProfileSub.unsubscribe()
 }

  
}
