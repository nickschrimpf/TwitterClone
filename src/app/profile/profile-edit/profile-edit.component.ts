import { Component, OnDestroy, OnInit} from '@angular/core';
import { Location } from '@angular/common';
import {  UntypedFormControl, UntypedFormGroup} from '@angular/forms';
import { ActivatedRoute, Params, Router} from '@angular/router';
import {  Observable, Subscription } from 'rxjs';
import { UserService } from 'src/app/auth/user.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize, map } from 'rxjs/operators';
import { UiService } from 'src/app/shared/ui.service';


@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit, OnDestroy {
  isLoading = false
  profileForm:UntypedFormGroup;
  userProfile
  profileSub:Subscription;
  routeSub:Subscription;
  bannerPhotoURL;
  editingBanner = false;
  profilePhotoURL;
  profileFile:File;
  profileFileSelected:File;
  profileFileSelectedURL;
  currenUserFlutterName;
  bannerProgress:Observable<Number>;
  uploadingBanner: boolean = false;
  profileProgress:Observable<Number>;
  uploadingProfile: boolean;
  flutterNameSub
  constructor(
    private userServ:UserService,
    private route:ActivatedRoute,
    private location:Location,
    private afstorage:AngularFireStorage,
    public uiServ:UiService
  ) { }
  

  ngOnInit(): void {
    this.isLoading = true
    this.uiServ.navBannerHide()
    this.uiServ.navMenuHide()
    this.routeSub = this.route.params.subscribe((params:Params) => {
      const currenUserFlutterName = params['id']
      this.flutterNameSub = this.userServ.getUserProfilebyFN(currenUserFlutterName).subscribe(user => {
        this.userProfile = user[0]
        this.profileForm.patchValue(this.userProfile)
        this.profilePhotoURL = this.userProfile.profilePhotoURL
        this.bannerPhotoURL = this.userProfile.bannerPhotoURL
        this.isLoading = false
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
    this.profileForm.untouched
  }
  onBack(){
    this.location.back()
  }

  onBannerFileSelected(event){
    this.editingBanner = true
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
              this.editingBanner = false
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
  this.flutterNameSub.unsubscribe()
  this.routeSub.unsubscribe()
  this.uiServ.navMenuVisable = true
  this.uiServ.bannerVisable = true
 }

}


