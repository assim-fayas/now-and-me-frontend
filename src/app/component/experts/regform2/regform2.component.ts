import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';


@Component({
  selector: 'app-regform2',
  templateUrl: './regform2.component.html',
  styleUrls: ['./regform2.component.css']
})
export class Regform2Component implements OnInit {
  constructor(private router: Router, private fb: FormBuilder) { }
  form!: FormGroup;
  form2Submitted = false
  ngOnInit() {
    this.form = this.fb.group({
      educationalQualification: ['', [Validators.required]],
      educationalInstitute: ['', [Validators.required]],
      specialization: ['', [Validators.required]],
      otherValue: ['', Validators.required],
      experience: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      certification: ['']
    });
  }

  submit() {

    this.form2Submitted = true
    const formData = this.form.value;
    console.log(formData);
    if (this.form.valid) {
      // formData = this.form.value;
      console.log(formData);
      this.router.navigate(['/experts/regform3'])
    }
  }












}