import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
      email: ['', [Validators.required]],
      name: ['', [Validators.required]],
      dob: ['', [Validators.required]],
      contact: ['', [Validators.required]],
      city: ['', [Validators.required]],
      governmentId: ['', [Validators.required]]
    })
  }

  onSubmit() {
    console.log("clikeee");

    if (this.regform1.valid) {
      console.log(this.regform1.value);
      this.form1Submitted = true
      let form1 = this.regform1.getRawValue()
      console.log(form1);
      this.router.navigate(['/experts/regform2'])

    }

  }

}
