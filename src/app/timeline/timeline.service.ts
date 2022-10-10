import { Injectable, } from '@angular/core';
import { Firestore,
  collectionData, 
  collection, 
  CollectionReference,
  DocumentData, 
} from '@angular/fire/firestore';

import { Observable, Subscription } from 'rxjs';
import { addDoc } from '@firebase/firestore';
import { Tweet } from './tweet.model'
import { UserService } from '../auth/user.service';


@Injectable({
  providedIn: 'root'
})

export class TimelineService  {
  today:number = Date.now()
  userProfile
  ProfileSub:Subscription
  usersTimeline
  private timeline$ : CollectionReference<DocumentData>
  posts$: CollectionReference<DocumentData>;

  constructor(private firestore:Firestore, private userServ:UserService) {
   }

  
  newTweet(tweet:any){
    const posts$ = collection(this.firestore,'users/'+tweet.autherId+'/posts')
    return addDoc(posts$, {...tweet,
      tweetDate:this.today,
    })
  }

  getTimeline(id){
    const posts$ = collection(this.firestore,'users/'+id+'/posts')
    return collectionData(posts$,{
      idField:'id',
    }) as Observable<Tweet[]>
    
  }
  


  
}
