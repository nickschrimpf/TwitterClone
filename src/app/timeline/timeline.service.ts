import { Injectable, } from '@angular/core';
import { Firestore,collection, collectionData} from '@angular/fire/firestore';
import { addDoc } from '@firebase/firestore';
import { Tweet } from './tweet.model'
import { UserService } from '../auth/user.service';
import {  Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserProfile } from '../auth/user-profile.model';

@Injectable({
  providedIn: 'root'
})

export class TimelineService  {
  today = Date.now()
  timeline = new Subject<Tweet[]>()
  
  

  constructor(private firestore:Firestore, private userServ:UserService) {
   }

  
  newTweet(tweet:any){
    const posts$ = collection(this.firestore,'users/'+tweet.autherId+'/posts')
    return addDoc(posts$, {...tweet,
      tweetDate:this.today,
    })
  }

  getPostsById(id){
    const postsCollection = collection(this.firestore,'users/'+id+'/posts')
     return collectionData(postsCollection,{idField:'id'}) as Observable<Tweet[]>
  }
  getUsersFollowerPosts(arrayOfIDs:[]){
    // arrayOfIDs.forEach((element:UserProfile) => {
    //   const postsCollection = collection(this.firestore,'user/'+element.id+'/posts56')

    // });
  }

}
