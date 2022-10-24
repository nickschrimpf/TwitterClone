import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { UserService } from 'src/app/auth/user.service';

@Injectable({
  providedIn: 'root'
})
export class TweetService {

  constructor(private userServ:UserService,private afs:AngularFirestore) { }

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
