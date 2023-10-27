import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/service/profile.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr'
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  constructor(private expertProfile: ProfileService, public toastr: ToastrService) { }

  expertprofile!: any
  modalOpen1 = false
  currentExpertId!: string
  loadingspinner = false

  expert = {
    name: '',
    city: '',
    bio: '',
    profileImage: null
  }




  ngOnInit(): void {
    this.profile()
  }
  profile() {
    this.loadingspinner = true
    this.expertProfile.expertProfile().subscribe((response: any) => {
      this.expertprofile = response
      console.log(response);
      this.loadingspinner = false
    }, (error) => {
      this.loadingspinner = false
      console.log(error);

    })
  }
  editProfiledata(expertId: string) {
    this.currentExpertId = expertId
    this.expert = { ...this.expertprofile }
    this.modalOpen1 = true

  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();


      console.log(formData, "form dataaa");
    }
  }

  onSubmit(expertForm: NgForm) {
    this.loadingspinner = true
    if (expertForm.valid) {


      // Form is valid, you can access the form values through this.expert
      console.log('Form submitted:', this.expert);
      console.log(this.currentExpertId);


      this.expertProfile.updateExpertProfile(this.expert, this.currentExpertId).subscribe((response: any) => {
        console.log(response);
        this.ngOnInit()
        this.toastr.success(response.message, 'Horrayyy 🎉', {
          timeOut: 2000,
        });
        this.loadingspinner = false
        this.closeModal1()
      }, (error) => {
        this.loadingspinner = false
        console.log(error);
        this.toastr.error('Something Went Wrong', 'oops😕', {
          timeOut: 2000,
        });

      })



    }

  }




  closeModal1() {
    this.modalOpen1 = false
  }

}
