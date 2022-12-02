import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TimelineComponent } from './timeline/timeline.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { LoginComponent } from './auth/login/login.component';
import { SignUpStepComponent } from './auth/sign-up-step/sign-up-step.component';
import { ProfileComponent } from './profile/profile.component';
import { ProfileEditComponent } from './profile/profile-edit/profile-edit.component';
import { HomeComponent } from './home/home.component';
import { TweetDetailComponent } from './home/tweet/tweet-detail/tweet-detail.component';
import { EditGuardService } from './shared/edit-guard.service';


const routes: Routes = [
  {path:'welcome',component:WelcomeComponent,children:[
    {
      path:'signup',component:SignUpComponent,
    },
    {
      path:'signupstep',component:SignUpStepComponent,
    },
    {
      path:'login',component:LoginComponent,
    }
  ]},
  {path:'home',redirectTo:'/home/timeline',pathMatch:'full'},
  {path:'home',component:HomeComponent,
  children:[
    {path:'timeline',component:TimelineComponent},
  ]},
    {path:':id', component:ProfileComponent,canActivateChild:[EditGuardService],children:[
      {path:'editprofile', component:ProfileEditComponent},
    ]},
    // {path:':id/editprofile', component:ProfileEditComponent,canActivate:[EditGuardService]},
    {path:':id/status/:tweetid',component:TweetDetailComponent},
    {path:'',redirectTo:'/home/timeline',pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
