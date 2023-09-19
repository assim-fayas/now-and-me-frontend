import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ExpertService } from 'src/app/service/expert.service';

@Component({
  selector: 'app-regform1',
  templateUrl: './regform1.component.html',
  styleUrls: ['./regform1.component.css']
})
export class Regform1Component {
  form1Submitted = false
  regform1!: FormGroup
  constructor(
    private fb: FormBuilder,
    private expertService: ExpertService,
    private router: Router
  ) { }

  ngOnInit() {
    this.regform1 = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), this.passwordValidator]],
      name: ['', [Validators.required, Validators.minLength(4)]],
      dob: ['', [Validators.required, this.ageValidator]],
      contact: ['', [Validators.required, this.contactValidator]],
      city: ['', [Validators.required]],
      governmentId: ['', [Validators.required]],
      profileImage: [null, [Validators.required]]
    })
  }


  // Custom password validator
  passwordValidator(control: AbstractControl) {
    // Require at least one uppercase letter and one special character
    const pattern = /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+])[a-zA-Z0-9!@#$%^&*()_+]{6,}$/;

    if (!pattern.test(control.value)) {
      return { pattern: true };
    }

    return null;
  }


  ageValidator(control: AbstractControl) {
    const dob = new Date(control.value);
    const today = new Date();
    const age = today.getFullYear() - dob.getFullYear();

    if (age < 18) {
      return { minAge: true };
    }

    return null;
  }

  contactValidator(control: AbstractControl) {
    const value = control.value;
    console.log(value);

    console.log("jj");



    if (value.length !== 10) {
      return { pattern: true };
    }

    return null;
  }


  onSubmit() {
    console.log("clikeee");
    this.form1Submitted = true
    if (this.regform1.valid) {
      this.expertService.registerForm1(this.regform1.value).subscribe((response:any) => {

        console.log(response);
        this.router.navigate(['/experts/regform2',response.expertid])
      }, (error) => {
        console.log(error);

      })

    }

  }






}
