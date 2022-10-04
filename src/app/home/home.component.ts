import { Component, DoCheck,  OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  route
  constructor(private auth:AuthService,private router:Router,private location: Location){
    
  }
  ngOnInit(){
    this.route = this.location.path()
  }
 
  ngDoCheck(): void {
    this.route = this.location.path()
  }
}
