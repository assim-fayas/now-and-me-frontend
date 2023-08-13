import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { UserServiceService } from 'src/app/service/user-service.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {

  resetPass!: FormGroup
  constructor(private formbuilder: FormBuilder,
     private userservice:UserServiceService,
     private router:Router
     ) {

    this.resetPass = this.formbuilder.group({
      password: new FormControl('',Validators.compose([Validators.required,Validators.minLength(6)])),
      confpassword: new FormControl('', Validators.required)
    },
    {
      validators:this.mustmatch( 'password','confpassword')

      
    })

  }

get f(){
  return this.resetPass.controls
}

mustmatch(password:any,confpassword:any){
  return (formGroup:FormGroup)=>{
    const passwordcontrol=formGroup.controls[password]
    const confpasswordcontrol=formGroup.controls[confpassword]

    if(confpasswordcontrol.errors && !confpasswordcontrol.errors['mustmatch']){
      return
    }
if(passwordcontrol.value!==confpasswordcontrol.value){
  confpasswordcontrol.setErrors({mustmatch:true})
}else{
  confpasswordcontrol.setErrors(null)
}
 }

}

formSubmit(){
 const password=this.resetPass.value.confpassword;
  
if(!password){
  return
}else{

this.userservice.restPassword(password).subscribe((response)=>{
  if(response){
    this.router.navigate(['/login'])
  }
},
(errorMessage)=>{
  console.log(errorMessage);
  
})






}

}

}
