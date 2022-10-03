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
import { map , first } from 'rxjs/operators';
import { UserProfile } from './user-profile.model';
import { Router } from '@angular/router';
import firebase from 'firebase/compat';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  private user:User;
  profile:UserProfile
  userProfile = new Subject<UserProfile>();
  currentUser = new Subject<User>();

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
        this.getCurrentUser()
        this.createUserProfile(user,signUpData.dob)
      }, function(error) {
        console.log("login error happend at update profile "+error)
        // An error happened.
      })
    })
  }

  createUserProfile(user: firebase.User, dob: any){
    console.log(user)
    const firebaseId = user.uid
    const displayName = user.displayName
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
      location: ''
    }
    addDoc(this.users$, {...newUserProfile}).then(user=> {
      const createdUserProfile:UserProfile = {
        id:user.id,
        firebaseId:firebaseId,
        followers:[],
        following:[],
        flutterName:null,
        displayName: displayName,
        profilePhotoURL:null,
        bannerPhotoURL:null,
        bio:null,
        website:null,
        dob:dob,
        location:null,
      }
      this.userProfile.next(createdUserProfile)
      this.profile = createdUserProfile
    })
  
  }
  getCurrentUserProfile(uid:string){
    if(this.profile){
      const currentUserProfile:UserProfile = this.profile
     this.userProfile.next(currentUserProfile)
    }else{
      const user = query(
        collection(this.firestore,'users'),where('firebaseId','==',uid)
      )
        collectionData(user,{idField:'id'}).subscribe((data:UserProfile[]) => {
           this.userProfile.next({ ...data[0]})
           this.profile =  {...data[0]}
        })
    }
  }

  getCurrentUser(){
    this.afAuth.currentUser.then(user => {
      if(user){
        const newUser:User = {
          displayName : user.displayName,
          id:user.uid,
          email:user.email,
          photoURL:user.photoURL,
        }
        this.currentUser.next(newUser)
        this.user = newUser
        this.getCurrentUserProfile(newUser.id)
      }
    })
  }

  setFlutterName(name:'string'){
    const docRef = doc(this.firestore,'users',this.profile.id)
    updateDoc(docRef,{'flutterName':name})
    this.router.navigate(['/timeline'])
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
    console.log(profile)
    const userProfileDocRef = doc(this.firestore,`users/${profile.id}`)
    return updateDoc(userProfileDocRef,{...profile})
  }

}
