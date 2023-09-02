import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { ExpertService } from 'src/app/service/expert.service';

function passwordValidator(control: AbstractControl): ValidationErrors | null {
  const value: string = control.value;
  const hasUppercase = /[A-Z]/.test(value);
  const hasSpecialCharacter = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(value);

  if (hasUppercase && hasSpecialCharacter) {
    return null; //valid password...
  }
  return { invalidPassword: true }
}
@Component({
  selector: 'app-expertregister',
  templateUrl: './expertregister.component.html',
  styleUrls: ['./expertregister.component.css']
})
export class ExpertregisterComponent implements OnInit {
  registrationForm!: FormGroup
  register = false
  message = ''
  constructor(
    private fb: FormBuilder,
    private expertService: ExpertService,
    private router: Router) { }

  ngOnInit() {
    this.registrationForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-]+)(\.[a-zA-Z]{2,5}){1,2}$/)]],
      phone: ['', [Validators.required, Validators.minLength(10), Validators.pattern(/^\d{10}$/)]],
      password: ['', [Validators.required, Validators.minLength(6), passwordValidator]]
    })
  }

  //to acess form controls
  get f() {
    return this.registrationForm.controls;
  }
  errormsg!: string

  onSubmit() {
    if (this.registrationForm.valid) {
      console.log(this.registrationForm.value);
      this.register = true
      let expert = this.registrationForm.getRawValue()
      console.log(expert);

      this.expertService.registerExpert(expert).subscribe((response) => {

      },

        (errorMessage) => {
          this.errormsg = errorMessage
          console.log(this.errormsg);

        }


      )


    }
  }

}
