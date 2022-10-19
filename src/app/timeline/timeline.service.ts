import { Injectable, } from '@angular/core';
import { Firestore,collection, collectionData,addDoc, getDocs} from '@angular/fire/firestore';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Tweet } from './tweet.model'
import {  Observable, Subject } from 'rxjs';
import {  map, switchMap} from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})

export class TimelineService  {
  today = Date.now()
  timeline$ = new Subject<Tweet[]>()



  constructor(private firestore:Firestore,private afs:AngularFirestore) {}


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

  getUsersFollowerPosts(id){
    let result = []
  this.afs.collectionGroup('users',ref => ref.where('followers','array-contains',id)).valueChanges({idField:'id'})
    .pipe(map(action => {
      console.log('action')
      console.log(action)
         action.forEach(doc => {
         console.log('doc')
        console.log(doc)
         this.afs.collection('users/'+doc['id']+'/posts')
          .snapshotChanges().pipe(map(docArray => {
          // console.log(docArray)
          return docArray.map(doc => {
            // console.log(doc)
             return {
              id:doc.payload.doc.id,
              tweet:doc.payload.doc.data()['tweet'],
              tweetDate:doc.payload.doc.data()['tweetDate'],
              auther:doc.payload.doc.data()['auther'],
              autherId:doc.payload.doc.data()['autherId'],
              autherDisplayName:doc.payload.doc.data()['autherDisplayName'],
              autherPhotoURL:doc.payload.doc.data()['autherPhotoURL'],
              replies:doc.payload.doc.data()['replies'],
              retweets:doc.payload.doc.data()['retweets'],
              likes:doc.payload.doc.data()['likes'],
            }

          })
        }))
        .subscribe(data => {
          console.log(data)
          result.push(...data)
          this.timeline$.next(result)
        })
      })
    }))
    .subscribe()
  }

}


