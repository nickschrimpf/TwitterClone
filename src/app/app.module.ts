import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { MaterialModule } from './material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TimelineComponent } from './timeline/timeline.component';
import { NewTweetComponent } from './timeline/new-tweet/new-tweet.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { AuthService } from './auth/auth.service';
import { AngularFireModule } from '@angular/fire/compat';

import { LoginComponent } from './auth/login/login.component';
import { BannerComponent } from './navigation/banner/banner.component';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { SideNavListComponent } from './navigation/side-nav-list/side-nav-list.component';
import { HeaderComponent } from './navigation/header/header.component';
import { SignUpStepComponent } from './auth/sign-up-step/sign-up-step.component';
import { ProfileComponent } from './profile/profile.component';
import { ProfileEditComponent } from './profile/profile-edit/profile-edit.component';
import { HomeComponent } from './home/home.component';







@NgModule({
  declarations: [
    AppComponent,
    TimelineComponent,
    NewTweetComponent,
    HeaderComponent,
    SignUpComponent,
    WelcomeComponent,
    LoginComponent,
    BannerComponent,
    SideNavListComponent,
    SignUpStepComponent,
    ProfileComponent,
    ProfileEditComponent,
    HomeComponent

  ],
  imports: [
    MaterialModule,
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
