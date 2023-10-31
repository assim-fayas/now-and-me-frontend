import { Component, OnInit } from '@angular/core';
import { error } from 'jquery';
import { ProfileService } from 'src/app/service/profile.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ImageuploadService } from 'src/app/service/imageupload.service';
import { environment } from 'src/environments/environment';
import { NgForm } from '@angular/forms';
import { CommunityService } from 'src/app/service/community.service';
import { ToastrService } from 'ngx-toastr'
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
  modalOpen1 = false;
  imageUrl!: string
  //loading spinner
  isLoading: boolean = false
  //profile variables
  userDetails: any = []//want to create interface
  image!: string


  user = {
    name: '',
    pronouns: '', // set default values if needed
    gender: '',
    bio: '',
    location: '',
    profileImage: '',

  };

  constructor(private profileService: ProfileService, private upload: ImageuploadService, private community: CommunityService, public toastr: ToastrService) { }
  ngOnInit() {
    this.isLoading = true
    this.getUserDetails()
    this.getPostDetails()
  }


  getUserDetails() {
    this.profileService.userDetails().subscribe((response: any) => { //want to create interface
      this.userDetails = response.userDetails
      console.log("location", response.userDetails.location);

      console.log(response);
      console.log("this.userDetailsssssssssssssss", this.userDetails);
      this.isLoading = false
    }, (error) => {
      console.log(error);
      this.isLoading = false

    })
  }


  onSubmit(userForm: NgForm) {
    if (userForm.valid) {


      // Form is valid, you can access the form values through this.user
      console.log('Form submitted:', this.user);
      console.log(this.user, "form details before submitting");

      this.profileService.updateProfile(this.user).subscribe((response: any) => {

        console.log(response);
        this.ngOnInit()
        this.closeModal1()
        this.toastr.success(response.message, 'Horrayyy 🎉', {
          timeOut: 2000,
        });
      }, (error) => {
        console.log(error);
        this.toastr.error('Something Went Wrong', 'oops😕', {
          timeOut: 2000,
        });
      })



    }
  }



  onFileSelected(event: any) {

    const file = event.target.files[0]; // Get the first (and only) file from the input
    console.log(file);

    if (file) {
      this.user.profileImage = file
      const reader = new FileReader()
      reader.onload = (event: any) => {

        this.imageUrl = event.target.result
      }
      reader.readAsDataURL(file);


    }


  }



  editProfiledata(userId: string) {

    this.profileService.userDetails().subscribe((response: any) => { //want to create interface
      this.userDetails = response.userDetails

      this.user = { ...response.userDetails }
      console.log(response);
      console.log("this.userDetailsssssssssssssss", this.userDetails);
      this.modalOpen1 = true

    }, (error) => {
      console.log(error);

    })

  }




  closeModal1() {
    this.modalOpen1 = false;
  }


  openModal1() {
    console.log("inside open modal");
    this.modalOpen1 = true
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
