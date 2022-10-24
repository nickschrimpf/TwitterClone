import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Firestore,
  collectionData,
  collection,
  query,
  where,
  addDoc,
  doc,
  CollectionReference,
  DocumentData,
  updateDoc,

} from '@angular/fire/firestore';
import { Observable, Subject} from 'rxjs';

import { map , first, take } from 'rxjs/operators';
import { UserProfile } from './user-profile.model';
import { Router } from '@angular/router';
import firebase from 'firebase/compat';
import { TimelineService } from '../timeline/timeline.service';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  public profile:UserProfile
  userProfile = new Subject<UserProfile>()
  private users$ : CollectionReference<DocumentData>

  constructor(
    private afs:AngularFirestore,
    private firestore:Firestore,
    private afAuth:AngularFireAuth,
    private router:Router,
    private tlService:TimelineService
    ) {
    this.users$ = collection(this.firestore,'users')
  }

  createProfile(signUpData){
    this.afAuth.currentUser.then(user => {
      user.updateProfile({
        displayName:signUpData.displayName,
      }).then(() => {
        this.createUserProfile(user,signUpData.dob)
      }, function(error) {
        console.log("login error happend at update profile "+error)
        // An error happened.
      })
    })
  }

  doesThisUserOwnThisProfile(id){
    if(this.profile){
      return this.profile.id === id
    }else{
      return false
    }
  }
  doesThisUserFollowthisProfile(id){
    if(this.profile){
      return this.profile.following.includes(id)
    }else{
      return false
    }
  }

  unfollowUser(id,follwersArray){
    const index = follwersArray.indexOf(this.profile.id)
    if(index > -1){
      follwersArray.splice(index,1)
      if(follwersArray.length === 0){
        this.afs.doc('users/'+id).update({followers:null}).then()
      }
      this.afs.doc('users/'+id).update({followers:follwersArray}).then()
    }
    const followingIndex = this.profile.following.indexOf(id)
    if(followingIndex > -1){
      this.profile.following.splice(followingIndex,1)
      this.afs.doc('users/'+this.profile.id).update({following:this.profile.following}).then()
    }
  }
  followUser(id,followersArray){
    const index = followersArray.indexOf(this.profile.id)
    if(index > -1){
      this.afs.doc('users/'+id).update({followers:followersArray}).then()
    }else {
      followersArray.push(this.profile.id)
      this.afs.doc('users/'+id).update({followers:followersArray}).then()
    }
    if(index > -1){
      this.afs.doc('users/'+this.profile.id).update({following:this.profile.following}).then()
    }else {
      this.profile.following.push(id)
      this.userProfile.next(this.profile)
      this.afs.doc('users/'+this.profile.id).update({following:this.profile.following}).then()
    }
  }
  createUserProfile(user: firebase.User, dob: any){
    const firebaseId = user.uid
    const displayName = user.displayName
    const memberSince = new Date(user.metadata.creationTime)
    const newUserProfile:UserProfile = {
      firebaseId: user.uid,
      followers: [],
      following: [],
      flutterName: null,
      displayName: user.displayName,
      profilePhotoURL: user.photoURL,
      bannerPhotoURL: null,
      bio: null,
      website: null,
      dob: dob,
      id: '',
      location: '',
      memberSince:memberSince
    }
    addDoc(this.users$, {...newUserProfile}).then(user=> {
      const createdUserProfile:UserProfile = {
        id: user.id,
        firebaseId: firebaseId,
        followers: [],
        following: [],
        flutterName: null,
        displayName: displayName,
        profilePhotoURL: null,
        bannerPhotoURL: null,
        bio: null,
        website: null,
        dob: dob,
        location: null,
        memberSince: memberSince
      }
      this.userProfile.next({ ...createdUserProfile } )
      this.profile = createdUserProfile
    })
  }

  getCurrentUserProfile(uid:string){

      const user = query(
        collection(this.firestore,'users'),where('firebaseId','==',uid)
      )
        collectionData(user,{idField:'id'}).subscribe((data:UserProfile[]) => {
           this.userProfile.next({ ...data[0]})
           this.tlService.getUsersFollowerPosts(data[0].id)
           this.profile =  {...data[0]}
        })

  }

  getLoggedInUserProfile(){
    return {...this.userProfile}
  }

  setFlutterName(name:'string'){
    const docRef = doc(this.firestore,'users',this.profile.id)
    updateDoc(docRef,{'flutterName':name})
    this.router.navigate(['/home/timeline'])
  }

  getUserProfilebyFN(flutterName:string){
    const userProfile = query(
      collection(this.firestore,'users'),where('flutterName','==',flutterName.toLowerCase())
    )
    return collectionData(userProfile,{idField:'id'}).pipe(take(1)) as Observable<UserProfile>
  }

 isFlutterNameUnique(flutterName:any){
    let isNameTaken:boolean = true;
    const isUnique = query(
      collection(this.firestore,'users'),where('flutterName','==',flutterName.toLowerCase())
    )
      return collectionData(isUnique).pipe(map(data => {
        return data.length > 0 ? true : false;
      })).pipe(first())
  }

  updateUserProfile(profile){
    const userProfileDocRef = doc(this.firestore,`users/${profile.id}`)
    return updateDoc(userProfileDocRef,{...profile})
  }
  logOut(){
    this.profile = null;
    this.router.navigate(['/welcome'])
    this.tlService.logOut()
  }

}
