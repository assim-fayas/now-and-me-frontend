import { Component,OnInit } from '@angular/core';
import { FormBuilder,Validators,FormGroup, AbstractControl, ValidationErrors } from '@angular/forms';

function passwordValidator(control:AbstractControl):ValidationErrors | null{  
  const value:string=control.value;
  const hasUppercase=/[A-Z]/.test(value);
  const hasSpecialCharacter= /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(value);
  
  if(hasUppercase && hasSpecialCharacter ){
    return null; //valid password...
  }
  return {invalidPassword:true}
}
@Component({
  selector: 'app-expertregister',
  templateUrl: './expertregister.component.html',
  styleUrls: ['./expertregister.component.css']
})
export class ExpertregisterComponent implements OnInit{
registrationForm!:FormGroup
constructor(private fb :FormBuilder){}

ngOnInit(){
this.registrationForm=this.fb.group({
  name:['',[Validators.required]],
  email:['',[Validators.required,Validators.pattern(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-]+)(\.[a-zA-Z]{2,5}){1,2}$/)]],
  phone:['',[Validators.required,Validators.minLength(10), Validators.pattern(/^\d{10}$/)]],
  password:['',[Validators.required,Validators.minLength(6),passwordValidator]]
})
}

//to acess form controls
get f(){
  return this.registrationForm.controls;
}
onSubmit(){
  if(this.registrationForm.valid){
    console.log(this.registrationForm.value);
    
  }
}

}
