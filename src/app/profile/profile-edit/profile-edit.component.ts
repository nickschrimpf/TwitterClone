import { Component, OnDestroy, OnInit} from '@angular/core';
import { Location } from '@angular/common';
import {  UntypedFormControl, UntypedFormGroup} from '@angular/forms';
import { ActivatedRoute, Params, Router} from '@angular/router';
import {  Observable, Subscription } from 'rxjs';
import { UserService } from 'src/app/auth/user.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize, map } from 'rxjs/operators';


@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit, OnDestroy {
  profileForm:UntypedFormGroup;
  userProfile
  profileSub:Subscription;
  bannerPhotoURL;
  
  profilePhotoURL;
  profileFile:File;
  profileFileSelected:File;
  profileFileSelectedURL;
  currenUserFlutterName;
  bannerProgress:Observable<Number>;
  uploadingBanner: boolean = false;
  profileProgress:Observable<Number>;
  uploadingProfile: boolean;
  constructor(
    private userServ:UserService,
    private route:ActivatedRoute,
    private router:Router,
    private location:Location,
    private afstorage:AngularFireStorage
  ) { }
  

  ngOnInit(): void {
    this.route.params.subscribe((params:Params) => {
      const currenUserFlutterName = params['id']
      this.userServ.getUserProfilebyFN(currenUserFlutterName).subscribe(user => {
        this.userProfile = user[0]
        this.profileForm.patchValue(this.userProfile)
        this.profilePhotoURL = this.userProfile.profilePhotoURL
        this.bannerPhotoURL = this.userProfile.bannerPhotoURL
      })
      this.initForm()
   })    
  }
  private initForm(){
    let bannerPhotoURL = ''
    let profilePhotoURL = ''
    let profileName =  '';
    let bio = '';
    let location = '';
    let website = '';
    
    this.profileForm = new UntypedFormGroup({
      'displayName':new UntypedFormControl(profileName),
      'bio':new UntypedFormControl(bio),
      'location':new UntypedFormControl(location),
      'website':new UntypedFormControl(website),
      'profilePhotoURL':new UntypedFormControl(profilePhotoURL),
      'bannerPhotoURL':new UntypedFormControl(bannerPhotoURL)
    })
  }
  onSubmit(){
    this.userServ.updateUserProfile({...this.profileForm.value,id:this.userProfile.id})
    console.log(this.profileForm.value)
  }
  onBack(){
    this.location.back()
  }

  onBannerFileSelected(event){
    if(event.target.files[0]){
      this.uploadingBanner = true;
      let bannerFile = event.target.files[0];
      const filePath = this.userProfile.id+'/bannerImages/'+bannerFile.name;
      const fileRef = this.afstorage.ref(filePath);
      const uploadTask = this.afstorage.upload(filePath,bannerFile);
      this.bannerProgress = uploadTask.percentageChanges();
        uploadTask.snapshotChanges().pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe(data => {
              this.profileForm.patchValue({bannerPhotoURL:data})
              this.profileForm.markAsTouched()
              this.bannerPhotoURL = data
              console.log(data)
              this.uploadingBanner = false;
            })  
          })
        ).subscribe(), error => {
          console.log(error)
        }
   
     }
  }

  onCancelBannerSelection(){
    
    this.bannerPhotoURL = '';
  }

  onProfileFileSelected(event){
    if(event.target.files[0]){
      this.profileFileSelected = event.target.files[0]
      const filePath = this.userProfile.id+'/profileImages/'+this.profileFileSelected.name
      const fileRef = this.afstorage.ref(filePath)
      const uploadTask = this.afstorage.upload(filePath,this.profileFileSelected)
      this.profileProgress = uploadTask.percentageChanges()
      this.uploadingProfile = true;
        uploadTask.snapshotChanges().pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe(data => {
              this.profileForm.patchValue({profilePhotoURL:data})
              this.profileForm.markAsTouched()
              this.profilePhotoURL = data
              this.uploadingProfile = false;
            })
            
          })
        ).subscribe(), error => {
          console.log(error)
        }
     }
  }
  onCancelProfileSelection(){
    this.profileFileSelected = null;
    this.profileFileSelectedURL = null;
  }

 ngOnDestroy(): void {
  // this.profileSub.unsubscribe()
 }

}


