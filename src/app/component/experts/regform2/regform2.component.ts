import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl, AbstractControlOptions } from '@angular/forms';
import { ValidatorFn } from '@angular/forms';
import { ExpertService } from 'src/app/service/expert.service';

function atLeastOneCheckboxCheckedValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    // Check if at least one checkbox is checked
    const checkboxes = Object.values(control.value);
    if (checkboxes.some(checkbox => checkbox === true)) {
      return null; // At least one checkbox is checked
    } else {
      return { atLeastOneCheckboxChecked: true }; // No checkbox is checked
    }
  };
}

@Component({
  selector: 'app-regform2',
  templateUrl: './regform2.component.html',
  styleUrls: ['./regform2.component.css']
})
export class Regform2Component implements OnInit {
  constructor(private router: Router, private fb: FormBuilder, private expertService: ExpertService,private route:ActivatedRoute) { }
form!: FormGroup;
form2Submitted = false
expertId!:string
// areasOfExpertise:any
ngOnInit() {
  this.form = this.fb.group({
    educationalQualification: ['', [Validators.required]],
    educationalInstitute: ['', [Validators.required]],
    specialization: ['', [Validators.required]],
    otherValue: [{ value: '', disabled: true }, Validators.required],
    experience: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
    certification: ['', [Validators.required]],

  });
   //getting user id from url 
   this.route.params.subscribe(params => {
    this.expertId = params['id']
  })

}



onRadioChange(value: string) {
  // Uncheck other radio buttons when "Other" is selected
  if (value === 'Other') {
    this.form.get('specialization')?.setValue('Other');
    this.form.get('otherValue')?.enable();
  } else {
    this.form.get('specialization')?.setValue(value);
    this.form.get('otherValue')?.disable();
  }
}


submit() {
  this.form2Submitted = true
  if (this.form.valid) {
    const formData = this.form.value
    console.log(formData);
    
    console.log("insideeeeee formmm");
    this.expertService.registerForm2(formData,this.expertId).subscribe((res)=>{
      console.log(res);
      
      this.router.navigate(['/experts/regform3',this.expertId])
    }, (error) => {
      console.log(error);

    })
  }
}




  // delete the not used value in form
  // deleteKeyValue(formvalues: any) {




  //   for (const key in formvalues) {
  //     if (formvalues[key] === true) {
  //      this.areasOfExpertise[key] = formvalues[key]
  //     }else if(formvalues[key]===false){
  //       delete formvalues[key];
  //     }
  //   }
  //   formvalues['Areas of Expertise'] = this.areasOfExpertise;
  //   return formvalues
  // }
   
  












}