import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
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
import { Observable, Subject  } from 'rxjs';

import { map , first, take } from 'rxjs/operators';
import { UserProfile } from './user-profile.model';
import { Router } from '@angular/router';
import firebase from 'firebase/compat';
import { TimelineService } from '../timeline/timeline.service';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  profile:UserProfile
  userProfile = new Subject<UserProfile>();
  private users$ : CollectionReference<DocumentData>
  constructor(
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

  createUserProfile(user: firebase.User, dob: any){
    console.log(user)
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
      this.userProfile.next({...createdUserProfile})
      this.profile = createdUserProfile
    })
  }

  getCurrentUserProfile(uid:string){
   
      const user = query(
        collection(this.firestore,'users'),where('firebaseId','==',uid)
      )
        collectionData(user,{idField:'id'}).subscribe((data:UserProfile[]) => {
           this.userProfile.next({ ...data[0]})
           this.tlService.getUsersFollowerPosts(data[0]['following'])
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
    this.userProfile.next(null);
    this.profile = null;
    this.router.navigate(['/welcome'])
  }

}
