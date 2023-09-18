import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Validators } from '@angular/forms';
import { UserServiceService } from '../../../service/user-service.service';
import { initFlowbite } from 'flowbite';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  constructor(private formBuilder: FormBuilder, private userService: UserServiceService,
    private router: Router) { }

  form!: FormGroup;
  register = false
  message = ''
  ngOnInit(): void {

    // initilising flowbite
initFlowbite()



// derclaring the form 

    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern('^(?=.*[@$!%*?&])[a-zA-Z0-9@$!%*?&]{8,}$')]]
    });
  }


  get f() {
    return this.form.controls;
  }

  errormsg!: string


  submit(): void {
    console.log('clicked');
    console.log('f form controlls', this.f);
    this.register = true
    let user = this.form.getRawValue()
    console.log(user, "userrrrrrr");



    this.userService.registerUser(user).subscribe((response) => {

    },
      (errorMessage) => {
        this.errormsg = errorMessage
        console.log(this.errormsg, ",,,,,,,message from regidtere");

      }
    )

  }
}