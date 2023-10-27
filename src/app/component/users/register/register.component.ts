import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Validators } from '@angular/forms';
import { UserServiceService } from '../../../service/user-service.service';
import { ToastrService } from 'ngx-toastr'
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  constructor(private formBuilder: FormBuilder, private userService: UserServiceService,
    private router: Router, public toastr: ToastrService) { }
  isLoading: boolean = false
  form!: FormGroup;
  register = false
  message = ''
  ngOnInit(): void {
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

    this.isLoading = true

    this.userService.registerUser(user).subscribe((response: any) => {
      this.isLoading = false
      this.toastr.success(response.message, 'Horrayyy 🎉', {
        positionClass: 'toast-top-center',
        timeOut: 2000,
      });
    },
      (errorMessage) => {
        this.isLoading = false
        this.errormsg = errorMessage
        this.toastr.error("Something Went Wrong", 'oops😕', {
          positionClass: 'toast-top-center',
          timeOut: 2000,
        });

      }
    )

  }
}