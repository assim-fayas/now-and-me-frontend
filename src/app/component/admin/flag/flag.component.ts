import { Component, OnInit } from '@angular/core';
import { AdminServiceService } from 'src/app/service/admin-service.service';
import { CommunityService } from 'src/app/service/community.service';
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

  constructor(private flagedPosts: CommunityService, private adminService: AdminServiceService) { }


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
    this.loadingspinner = true
    console.log("warning mail", userId, postId);
    this.flagedPosts.sendMail(userId, postId).subscribe((response) => {
      console.log(response);
      this.loadingspinner = false
    }, (error) => {
      console.log(error);
      this.loadingspinner = false
    })



  }
  // blockpost
  blockPost(userId: string, postid: string) {
    console.log("blockPost", userId, postid);
    this.loadingspinner = true
    this.flagedPosts.blockPost(userId, postid).subscribe((response) => {
      console.log(response);
      this.loadingspinner = false
      this.ngOnInit()
    }, (error) => {
      console.log(error);
      this.loadingspinner = false
    })

  }

  //suspendUser
  suspendUser(userid: string) {
    this.adminService.blockuser(userid).subscribe((response) => {
      console.log(response);

    }, (error) => {
      console.log(error);

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
