import { Component, OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { error } from 'jquery';
import { ProfileService } from 'src/app/service/profile.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ImageuploadService } from 'src/app/service/imageupload.service';
import { environment } from 'src/environments/environment';
import { NgForm } from '@angular/forms';
import { CommunityService } from 'src/app/service/community.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  thoughts: any = []
  showpost: boolean = false
  currentPost!: string
  modalclose: Boolean = false
  thougthSectionvisible = true
  anonymouseSectionVisible = false

  //profile variables

  userDetails: any = []//want to create interface
  image!: string


  user = {
    name: '',
    pronouns: '', // set default values if needed
    gender: '',
    bio: '',
    location: '',
    profileImage: null // Initialize profileImage as null
  };

  constructor(private profileService: ProfileService, private upload: ImageuploadService, private community: CommunityService) { }
  ngOnInit() {
    initFlowbite()
    this.getUserDetails()
    this.getPostDetails()
  }


  getUserDetails() {
    this.profileService.userDetails().subscribe((response: any) => { //want to create interface
      this.userDetails = response.userDetails
      console.log("location", response.userDetails.location);

      console.log(response);
      console.log("this.userDetailsssssssssssssss", this.userDetails);

    }, (error) => {
      console.log(error);

    })
  }


  onSubmit(userForm: NgForm) {
    if (userForm.valid) {
      // Form is valid, you can access the form values through this.user
      console.log('Form submitted:', this.user);
      this.profileService.updateProfile(this.user).subscribe((response) => {
        console.log(response);

      }, (error) => {
        console.log(error);

      })


      // You can send this.user to your API or perform any other action here.
    }
  }

  private uploadPreset = environment.uploadPreset
  private cloudName = environment.cloudName
  onFileSelected(event: any) {
    // Handle file upload here
    const file = event.target.files[0]; // Get the first (and only) file from the input
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', this.uploadPreset);
      formData.append('cloud_name', this.cloudName);

      console.log(formData, "form dataaa");

      this.upload.uploadImage(formData).subscribe(
        (res) => {
          console.log("cloudinary", res);
        },
        (error) => {
          console.log('upload error', error);
        }
      );
    }
  }




  editProfiledata(userId: string) {

    this.profileService.userDetails().subscribe((response: any) => { //want to create interface
      this.userDetails = response.userDetails

      this.user = { ...response.userDetails }
      console.log(response);
      console.log("this.userDetailsssssssssssssss", this.userDetails);

    }, (error) => {
      console.log(error);

    })

  }




  closeModal() {


    this.modalclose = false;
  }


  openModal() {
    console.log("inside open modal");
    this.modalclose = true;
  }





  getPostDetails() {
    this.community.thoughtOfSpecificUser().subscribe((Response) => {
      console.log("post ree night", Response);
      this.thoughts = Response


    }, (error) => {
      console.log(error);

    })
  }


  // buttonClasses = ? 'bg-gray-900 text-white' : 'bg-white text-gray-900';

  changeSectionToAnonymous() {

    this.anonymouseSectionVisible = false
    this.thougthSectionvisible = true


  }

  changeSectionToThoughts() {



    this.thougthSectionvisible = false

    this.anonymouseSectionVisible = true
  }




  //sreddichu cheyyendath


  showeditpost(id: string) {

  }
  editPost(id: string) {

  }
  deletePost(id: string) {

  }

  AddLike(id: string) {

  }
  isLikedd(postId: string, id: string): boolean {
    return false
  }
  flagPost(id: string) {

  }
  showComment(id: string) {

  }

}
