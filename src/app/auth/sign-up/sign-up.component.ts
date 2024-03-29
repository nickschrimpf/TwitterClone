import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  constructor(private authService:AuthService) { }

  ngOnInit(): void {
  }
  
  onSubmit(form:NgForm){
    this.authService.createNewUser(form.value)
  }

}
