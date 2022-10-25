import { Injectable, OnDestroy, } from '@angular/core';
import { Firestore,collection, collectionData,addDoc, getDocs} from '@angular/fire/firestore';
import { AngularFirestore, AngularFirestoreCollection, DocumentData } from '@angular/fire/compat/firestore';
import { Tweet } from './tweet.model'
import {  Observable, Subject, Subscription } from 'rxjs';
import {  map, switchMap} from 'rxjs/operators';
import { TweetService } from '../home/tweet/tweet.service';



@Injectable({
  providedIn: 'root'
})

export class TimelineService  {
  today = Date.now()
  timeline$ = new Subject<Tweet[]>()
  followersSub:Subscription
  postSub:Subscription

  constructor(private firestore:Firestore,private afs:AngularFirestore) {}

  getPostsById(id){
    const postsCollection = collection(this.firestore,'users/'+id+'/posts')
     return collectionData(postsCollection,{idField:'id'}) as Observable<Tweet[]>
  }

  getUsersFollowerPosts(id){
    let result = []
    let observData:Observable<DocumentData[]>[] = []
  this.followersSub = this.afs.collectionGroup('users',ref => ref.where('followers','array-contains',id)).valueChanges({idField:'id'})
    .pipe(map(action => {
      // console.log('action')
      // console.log(action)

         action.forEach(doc => {


         this.postSub = this.afs.collection('users/'+doc['id']+'/posts')
          .valueChanges({idField:'id'})

        .subscribe(data => {
          let existingTweetIDS = [];

          data.forEach(tweet => {

           result.push(tweet)

          })
          // console.log(result)
          // result.push(...data)

          this.timeline$.next(result)
        })
      })
    }))
    .subscribe()

  }

  logOut(){
    this.followersSub.unsubscribe()
    this.postSub.unsubscribe()
    this.timeline$.complete()
  }

}


