import { Component, OnInit } from '@angular/core';
import { AdminServiceService } from 'src/app/service/admin-service.service';
import { CommunityService } from 'src/app/service/community.service';
import { ToastrService } from 'ngx-toastr'
// import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-flag',
  templateUrl: './flag.component.html',
  styleUrls: ['./flag.component.css']
})
export class FlagComponent implements OnInit {
  modalOpen1 = false;
  modalOpen2 = false;
  thoughts!: any
  flagPost: any
  loadingspinner = true

  constructor(private flagedPosts: CommunityService, private adminService: AdminServiceService, public toastr: ToastrService) { }


  openModal1(id: string) {
    console.log("post id", id);
    this.loadingspinner = true
    this.flagedPosts.getSpecificPost(id).subscribe((Response: any) => {
      console.log("single post", Response);
      this.thoughts = Response
      console.log(this.thoughts, "ithuuuuu");
      this.loadingspinner = false
    }, (error) => {
      console.log(error);
      this.loadingspinner = false

    })

    this.modalOpen1 = true;

  }
  openModal2(id: string) {
    this.loadingspinner = true
    this.flagedPosts.getSpecificPost(id).subscribe((Response: any) => {
      console.log("single post", Response);
      this.thoughts = Response
      console.log(this.thoughts, "ithuuuuu");
      this.loadingspinner = false
    }, (error) => {
      console.log(error);
      this.loadingspinner = false
    })

    this.modalOpen2 = true;
  }

  closeModal1() {
    console.log("inside");
    console.log(this.modalOpen2);


    this.modalOpen1 = false;



  }

  closeModal2() {
    this.modalOpen2 = false;
  }

  // end of modal





  ngOnInit(): void {

    // initFlowbite()
    this.getFlagedPosts()
  }

  getFlagedPosts() {

    this.flagedPosts.getFlagedPosts().subscribe((Response: any) => {
      this.loadingspinner = true
      // to get the count of the flage posts
      for (let i = 0; i < Response.flagedPosts.length; i++) {
        const object = Response.flagedPosts[i];
        object.flagsCount = object.flags.length;
      }

      //saving that response to the state
      this.flagPost = Response.flagedPosts;
      this.loadingspinner = false
      console.log(this.flagPost, "flaged posttttt");

    }, (error) => {
      console.log(error);
      this.loadingspinner = false
    })

  }

  //warning mail
  sendWarningMail(userId: string, postId: string) {

    console.log("warning mail", userId, postId);
    this.flagedPosts.sendMail(userId, postId).subscribe((response: any) => {
      console.log(response);

      this.toastr.warning(response.message, ' 🎉', {
        timeOut: 2000,
      });
    }, (error) => {
      console.log(error);

      console.log(error);
      this.toastr.error('Something  Went Wrong', 'oops😕', {
        timeOut: 2000,
      });
    })



  }
  // blockpost
  blockPost(userId: string, postid: string) {
    console.log("blockPost", userId, postid);

    this.flagedPosts.blockPost(userId, postid).subscribe((response: any) => {
      console.log(response);

      this.ngOnInit()
      if (response.message == "Post Blocked and Email send successfully") {
        this.toastr.warning(response.message, ' 🎉', {
          timeOut: 2000,
        });
      } else {
        this.toastr.success(response.message, ' 🎉', {
          timeOut: 2000,
        });
      }
    }, (error) => {
      console.log(error);

      this.toastr.error('Something  Went Wrong', 'oops😕', {
        timeOut: 2000,
      });
    })

  }

  //suspendUser
  suspendUser(userid: string) {
    this.adminService.blockuser(userid).subscribe((response: any) => {
      console.log(response);
      if (response.message == "user blockeddd") {
        this.toastr.warning(response.message, ' 🎉', {
          timeOut: 2000,
        });
      } else {
        this.toastr.success(response.message, ' 🎉', {
          timeOut: 2000,
        });
      }
    }, (error) => {
      console.log(error);
      this.toastr.error('Something  Went Wrong', 'oops😕', {
        timeOut: 2000,
      });
    })

  }


  //sreddichu cheyyendath


  showeditpost(id: string) {

  }
  editPost(id: string) {

  }
  deletePost(id: string) {

  }

  AddLike() {

  }
  isLikedd(postId: string, id: string): boolean {
    return false
  }

  showComment() {

  }



}
