import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { UserService } from 'src/app/auth/user.service';
import { Firestore,collection, collectionData,addDoc, getDocs} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class TweetService {
  today = Date.now()
  constructor(public userServ:UserService,private afs:AngularFirestore,private firestore:Firestore,) { }

  newTweet(tweet:any){
    const posts$ = collection(this.firestore,'users/'+this.userServ.profile.id+'/posts')
    return addDoc(posts$, {...tweet})
  }

  onRetweet(tweet){
    let retweets = tweet.retweets
    retweets.push(this.userServ.profile.id)
    console.log(retweets)

    this.afs.doc('users/'+tweet.autherId+'/posts/'+tweet.id).update({retweets:retweets})
    const posts = collection(this.firestore,'users/'+this.userServ.profile.id+'/posts')
    addDoc(posts,{...tweet,retweetedBy:this.userServ.profile.flutterName})
  }


  onTweetLike(tweet){
    const index = tweet.likes.indexOf(this.userServ.profile.id)
    if(index > -1){
      this.afs.doc('users/'+tweet.autherId+'/posts/'+tweet.id).update({likes:tweet.likes})
    }else{
      tweet.likes.push(this.userServ.profile.id)
      this.afs.doc('users/'+tweet.autherId+'/posts/'+tweet.id).update({likes:tweet.likes})
    }
    console.log(this.userServ.profile)
    console.log(tweet)
  }

  onNotLikeTweet(tweet){
    const index = tweet.likes.indexOf(this.userServ.profile.id)
    if(index > -1){
      tweet.likes.splice(index,1)
      this.afs.doc('users/'+tweet.autherId+'/posts/'+tweet.id).update({likes:tweet.likes})
    }else{
      tweet.likes.push(this.userServ.profile.id)
      this.afs.doc('users/'+tweet.autherId+'/posts/'+tweet.id).update({likes:tweet.likes})
    }
    console.log(this.userServ.profile)
    console.log(tweet)
  }
}
