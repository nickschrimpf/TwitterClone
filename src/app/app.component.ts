import { Component, DoCheck,  OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth/auth.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit,DoCheck {
  title = 'twitterClone';
  route
  constructor(private auth:AuthService,private router:Router,private location: Location){
    
  }
  ngOnInit(){
    this.route = this.location.path()
    this.auth.initAuthListener()
  }
 
  ngDoCheck(): void {
    this.route = this.location.path()
  }
}
