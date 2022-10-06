import { Component, OnInit } from '@angular/core';
import { AbstractControl, UntypedFormControl, UntypedFormGroup, NgForm, ValidationErrors, Validators } from '@angular/forms';
import { UniqueFlutterNameService } from '../unique-flutter-name.service';
import { UserService } from '../user.service';



@Component({
  selector: 'app-sign-up-step',
  templateUrl: './sign-up-step.component.html',
  styleUrls: ['./sign-up-step.component.css']
})
export class SignUpStepComponent implements OnInit, Validators {
  userProfileForm:UntypedFormGroup;

  constructor(private userService:UserService, private uniqueFNS:UniqueFlutterNameService) { }




  ngOnInit(): void {
    this.initForm()
  }

  private initForm(){
    let flutterName = '';
    this.userProfileForm = new UntypedFormGroup({
      'flutterName': new UntypedFormControl(flutterName,
        {
          validators:[Validators.required,Validators.maxLength(15), Validators.minLength(8)],
          asyncValidators:this.uniqueFNS.isUnique(this.userProfileForm),
        } 
      )
    })
  }

  get flutterName() {return this.userProfileForm.get('flutterName')}

  onSubmit(): void{
    
    this.userService.setFlutterName(this.userProfileForm.value.flutterName.toLowerCase())
    console.log(this.userProfileForm.value)
  }


}
