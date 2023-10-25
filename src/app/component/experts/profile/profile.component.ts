import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/service/profile.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  constructor(private expertProfile: ProfileService) { }

  expertprofile!: any
  modalOpen1 = false
  currentExpertId!: string

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
    this.expertProfile.expertProfile().subscribe((response: any) => {
      this.expertprofile = response
      console.log(response);

    }, (error) => {
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
    if (expertForm.valid) {


      // Form is valid, you can access the form values through this.expert
      console.log('Form submitted:', this.expert);
      console.log(this.currentExpertId);


      this.expertProfile.updateExpertProfile(this.expert, this.currentExpertId).subscribe((response) => {
        console.log(response);
        this.ngOnInit()
        this.closeModal1()
      }, (error) => {
        console.log(error);

      })



    }

  }




  closeModal1() {
    this.modalOpen1 = false
  }

}
