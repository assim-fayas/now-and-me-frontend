import { Component, OnInit } from '@angular/core';
import { error } from 'jquery';
import { ProfileService } from 'src/app/service/profile.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ImageuploadService } from 'src/app/service/imageupload.service';
import { environment } from 'src/environments/environment';
import { NgForm } from '@angular/forms';
import { CommunityService } from 'src/app/service/community.service';
import { ToastrService } from 'ngx-toastr'
import { Store } from '@ngrx/store';
import { select } from '@ngrx/store';
import { retriveprofile } from '../userstate/userstate.action';
import { userprofile } from '../userstate/userstate.selector';
import { Profile } from '../userstate/usermodel';
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
  userDetails!: any //want to create interface
  // image!: string





  user = {
    name: '',
    pronouns: '',
    gender: '',
    bio: '',
    location: '',
    image: '',

  };

  constructor(private profileService: ProfileService,
    private community: CommunityService,
    public toastr: ToastrService,
    private store: Store<{ userdetails: Profile }>) { }
  ngOnInit() {
    this.isLoading = true
    this.userDetails = this.store.dispatch(retriveprofile())
    this.getUserDetails()
    this.getPostDetails()

  }


  getUserDetails() {
    this.store.pipe(select(userprofile)).subscribe((userProfileData => {
      this.isLoading = false
      console.log("data from store......", userProfileData)

      this.userDetails = userProfileData
      console.log("this.user", this.user);
      console.log("this.user ", this.user);
    }))

  }


  onSubmit(userForm: NgForm) {
    if (userForm.valid) {
      console.log('Form submitted:', this.user);
      console.log(this.user, "form details before submitting");

      this.profileService.updateProfile(this.user).subscribe((response) => {

        this.store.dispatch(retriveprofile())


        this.toastr.success('Profile Updated', 'Horrayyy 🎉', {
          timeOut: 2000,
        });
        this.modalOpen1 = false
      }, (error) => {
        console.log(error);
        this.toastr.error('Something Went Wrong', 'oops😕', {
          timeOut: 2000,
        });
      })


      this.modalOpen1 = false
    }
  }



  onFileSelected(event: any) {

    const file = event.target.files[0]; // Get the first (and only) file from the input
    console.log(file);

    if (file) {
      this.user.image = file
      const reader = new FileReader()
      reader.onload = (event: any) => {

        this.imageUrl = event.target.result
      }
      reader.readAsDataURL(file);


    }


  }



  editProfiledata(userId: string) {
    this.modalOpen1 = true
    this.store.pipe(select(userprofile)).subscribe((userProfileData => {
      console.log("data from store......", userProfileData)

      this.user = { ...userProfileData }
      console.log("this.user", this.user);

      console.log("this.user ", this.user);



    }))

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
