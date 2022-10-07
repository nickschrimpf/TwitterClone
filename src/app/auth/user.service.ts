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
import { Subject  } from 'rxjs';
import { User } from './user.model';
import { map , first, exhaustMap, take } from 'rxjs/operators';
import { UserProfile } from './user-profile.model';
import { Router } from '@angular/router';
import firebase from 'firebase/compat';

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
    return this.profile.id === id
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
  getUserProfilebyFN2(flutterName:string){
    const userProfile = query(
      collection(this.firestore,'users'),where('flutterName','==',flutterName.toLowerCase())
    )
    return collectionData(userProfile,{idField:'id'}).subscribe(data => {
      return data
    })
  }

  getUserProfilebyFN(flutterName:string){
    const userProfile = query(
      collection(this.firestore,'users'),where('flutterName','==',flutterName.toLowerCase())
    )
    return collectionData(userProfile,{idField:'id'})
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
