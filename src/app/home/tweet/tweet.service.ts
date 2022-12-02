import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { UserService } from 'src/app/auth/user.service';
import { Firestore,collection,addDoc, doc, docData} from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class TweetService {
  constructor(public userServ:UserService,private afs:AngularFirestore,private firestore:Firestore,) { }

  newTweet(tweet:any){
    const posts$ = collection(this.firestore,'posts/')
    return addDoc(posts$, {...tweet})
  }
  onReply(reply){
    const replyCollection = collection(this.firestore,'posts/'+reply.tweet+'/replies')
    addDoc(replyCollection,{...reply}).catch(
      (err) => new Error(err.message)
    )
  }
  onRetweet(tweet){
    let retweets = tweet.retweets
    retweets.push(this.userServ.profile.id)
    console.log(retweets)

    this.afs.doc('/posts/'+tweet.id).update({retweets:retweets})
    const posts = collection(this.firestore,'/posts/')
    addDoc(posts,{...tweet,retweetedBy:this.userServ.profile.flutterName}).catch(
      (err) => new Error(err.message)
    )
  }

  onTweetLike(tweet){
    const index = tweet.likes.indexOf(this.userServ.profile.id)
    if(index > -1){
      this.afs.doc('/posts/'+tweet.id).update({likes:tweet.likes}).catch(
        (err) => new Error(err.message)
      )
    }else{
      tweet.likes.push(this.userServ.profile.id)
      this.afs.doc('/posts/'+tweet.id).update({likes:tweet.likes}).catch(
        (err) => new Error(err.message)
      )
    }
    // console.log(this.userServ.profile)
    // console.log(tweet)
  }

  onNotLikeTweet(tweet){
    const index = tweet.likes.indexOf(this.userServ.profile.id)
    if(index > -1){
      tweet.likes.splice(index,1)
      this.afs.doc('/posts/'+tweet.id).update({likes:tweet.likes}).catch(
        (err) => new Error(err.message)
      )
    }else{
      tweet.likes.push(this.userServ.profile.id)
      this.afs.doc('/post/'+tweet.id).update({likes:tweet.likes}).catch(
        (err) => new Error(err.message)
      )
    }
    // console.log(this.userServ.profile)
    // console.log(tweet)
  }

  onGetTweet(tweetId){
   const tweetRef = doc(this.firestore,'/posts/'+tweetId)
   return  docData(tweetRef, {idField:'id'})
  }

  // onGetReplies(id){
  //  this.afs.collection('posts/'+id+'/replies')
  // }
}
