import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  query,
  where,
} from '@angular/fire/firestore';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Tweet } from './tweet.model';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TimelineService {
  timeline$ = new BehaviorSubject<Tweet[]>(null);
  timelineSub: Subscription;

  constructor(private firestore: Firestore, private afs: AngularFirestore) {}

  getPostsById(id) {
    const postsCollection = query(
      collection(this.firestore, 'posts'),
      where('ownerID', '==', id)
    );
    return collectionData(postsCollection, { idField: 'id' }) as Observable<
      Tweet[]
    >;
  }
  
  getUsersFollowingPosts(arrayOfFollowing) {
    if (arrayOfFollowing.length > 0) {
      const post$ = query(
        collection(this.firestore, 'posts'),
        where('ownerID', 'in', arrayOfFollowing)
      );
      this.timelineSub = collectionData(post$, { idField: 'id' }).subscribe(
        (data: Tweet[]) => {
          this.timeline$.next(data) as unknown as Tweet[];
        }
      );
    }
  }

  logOut() {
    this.timelineSub.unsubscribe();
    this.timeline$.complete();
  }
}
