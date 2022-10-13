import { Injectable, } from '@angular/core';
import { Firestore,collection, collectionData,addDoc} from '@angular/fire/firestore';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Tweet } from './tweet.model'
import {  merge, Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class TimelineService  {
  today = Date.now()
  
  
  

  constructor(private firestore:Firestore,afs:AngularFirestore) {
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
  getUsersFollowerPosts(){
   
  }

}
