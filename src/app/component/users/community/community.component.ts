import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { communityPost } from 'src/app/models';
import { CommunityService } from 'src/app/service/community.service';
import { UserServiceService } from 'src/app/service/user-service.service';
// import { initFlowbite } from 'flowbite';
import { FlagFormvalue } from 'src/app/models';
import { CommentFormValue } from 'src/app/models';
import { NgForm } from '@angular/forms';
import { error } from 'jquery';
@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.css']
})

export class CommunityComponent implements OnInit {

  @ViewChild('commentForm') commentForm!: NgForm;



  submitted = false
  showpost: Boolean = false
  currentPost!: string
  form!: FormGroup;
  editForm!: FormGroup
  selectedTags: string[] = [];
  submittedFormValue!: communityPost
  allThoughts: any = [];
  isLiked: Boolean = false;
  currentLikePost: any = []
  currentUserId!: string
  currentUserName!: string
  currentEditPost: any
  anonymous = false
  selectedOption!: string; // Bind this variable to the selected radio button value
  additionalComments: string = '' // Bind this variable to the textarea input
  flagFormvalue!: FlagFormvalue
  errorInFlagPost = false
  currentComment!: string
  commentText: string = '';
  commentFormValues!: CommentFormValue
  showCommentbox = false
  currentCommentId!: string
  showEditcomment = false
  editcomment = false
  modalOpen1 = false
  EditModalOpen = false
  FlagModalOpen = false


  constructor(private editFb: FormBuilder, private router: Router, private fb: FormBuilder, private communityService: CommunityService, private userservice: UserServiceService) {
    this.showpost = false
    console.log(this.selectedTags.length);

    this.form = this.fb.group({
      thoughts: ['', Validators.required],
      tags: ['', [Validators.required, this.validateTags]],
      postAnonymously: [false],
    }) as FormGroup;


    this.editForm = this.editFb.group({
      thoughts: ['', Validators.required],
      tags: ['', [Validators.required, this.validateTags]],
      postAnonymously: [false],
    }) as FormGroup;

  }
  ngOnInit() {
    // initFlowbite()
    this.getLikesCommentCount()


  }

  validateTags(control: FormControl) {
    const tags = (control.value as string).split(' ').map(tag => tag.trim());
    if (tags.length >= 3) {
      return { tooManyTags: true };
    }

    return null;
  }

  onTagKeyUp(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    const tag = input.value.trim();

    if (event.key === ' ' && tag.length > 0 && this.selectedTags.length < 3) {
      this.selectedTags.push(tag);
      input.value = '';
    }
  }

  removeTag(tag: string) {
    this.selectedTags = this.selectedTags.filter(t => t !== tag);
  }


  onSubmit() {
    this.submitted = true
    if (this.form.valid) {
      this.form.reset()
      this.submittedFormValue = {
        thoughts: '',
        tags: [],
      };
      this.submittedFormValue = {
        ...this.form.value,
        tags: this.selectedTags,
      };
      console.log(this.submittedFormValue, "form valueeeeeee");

      this.communityService.postThoughts(this.submittedFormValue).subscribe((response: any) => {
        this.ngOnInit()



      }, (error) => {
        console.log(error);

      })


    }

  }

  onSubmitEditModal() {
    console.log("inside modalllll");

    this.submitted = true

    console.log("edit form valueeee", this.editForm.value);
    this.submittedFormValue = {
      ...this.editForm.value,
      tags: this.selectedTags
    }

    console.log(this.submittedFormValue, "last value");
    this.communityService.updatePost(this.currentPost, this.submittedFormValue).subscribe((Response) => {
      this.closeEditModal()
      console.log(Response);
      this.ngOnInit()

    }, (error) => {
      console.log(error);

    })


  }



  removeAlltags() {
    this.selectedTags.length = 0;
    console.log("array cleared");
    this.closeModal1()
    this.form.reset()


  }
  removetagsAndCloseModel() {
    this.selectedTags.length = 0;
    this.closeEditModal()
    this.editForm.reset()
  }



  AddLike(id: string) {
    this.communityService.addLike(id).subscribe(
      (response: any) => {//type indakkanam
        console.log("likeddddd", response.likeCount, "likedddd");
        this.getLikesCommentCount()
      },
      (error) => {
        console.log(error);
      }
    );
  }



  getLikesCommentCount() {
    this.communityService.countOfCommentsandLikes().subscribe((response: any) => {//type indakkanam
      console.log(response);
      this.allThoughts = response

      console.log("eeeeeeeeeeeeeeeeeeeeeeeee", this.allThoughts);
      this.currentUserName = response[0].currentUserName
      let user = this.allThoughts[0].currentUser
      console.log(user, "user");
      console.log(this.currentUserName, "user name");


      // Filter the responseData to get only the documents where likes contain the user ID
      this.currentLikePost = response.filter((item: any) => {
        return item.likes.includes(user);
      });


      console.log(this.currentLikePost, "curent like postttttt");


    }, (error) => {
      console.log(error);

    })

  }

  isLikedd(postId: string, userIdToCheck: string): boolean {
    // Find the post with the given postId
    const post = this.currentLikePost.find((item: any) => item._id === postId);

    // Check if the post exists and if userIdToCheck is in the likes array
    return !!post && post.likes.includes(userIdToCheck);
  }


  //edit post
  editPost(postId: string) {//type indakkanam
    console.log("edit clicked");
    this.openEditModal()
    this.communityService.editPost(postId).subscribe((Response: any) => {
      console.log(Response);
      if (Response) {
        this.currentEditPost = Response
        this.showeditpost(this.currentPost)
        this.currentPost = Response._id
        this.selectedTags = [...Response.tags]
        this.anonymous = Response.anonymous

        this.editForm.patchValue({
          thoughts: Response.content,


        });


      }
    }, (error) => {
      console.log(error);
    })
  }

  //delete post
  deletePost(postid: string) {
    this.communityService.deletePost(postid).subscribe((response) => {
      console.log("clicked delete post");

      if (response) {

        this.showeditpost(this.currentPost)
        this.ngOnInit()
      }



    }, (error) => {
      console.log(error);

    })
  }

  SubmitflagPost() {
    this.errorInFlagPost = false
    if (this.selectedOption == "other" && this.additionalComments.length == 0) {
      this.errorInFlagPost = true
      return
    }

    this.flagFormvalue = {
      report: this.selectedOption,
      reason: this.additionalComments
    }
    console.log("flag post valueeee", this.flagFormvalue);
    this.communityService.flagPost(this.currentPost, this.flagFormvalue).subscribe((response) => {
      this.closeFlagModal()
      console.log(response);
    }, (error) => {
      console.log(error);
    })

  }

  //flag post
  flagPost(postid: string) {
    this.currentPost = postid
    this.showeditpost(postid)
    this.openFlagModal()
  }


  //open and closing for edit delete & flag
  showeditpost(id: string) {
    if (this.showpost == false) {
      this.showpost = true;
      this.currentPost = id
    } else {
      this.showpost = false

    }
  }

  showComment(postid: string) {
    console.log("show comment");
    if (this.showCommentbox == false) {
      this.showCommentbox = true
      this.currentPost = postid
    } else {
      this.showCommentbox = false
    }


  }

  showEditComment(id: string) {
    if (this.showEditcomment == false) {
      this.showEditcomment = true
      this.currentCommentId = id
    } else {
      this.showEditcomment = false
    }

  }


  submitComment(userId: string, postId: string) {

    if (this.editcomment == true) {
      console.log("current comment id", this.currentCommentId);

      this.communityService.updateComment(this.currentCommentId, this.commentText).subscribe((Response) => {
        console.log(Response);
        this.editcomment = false
        this.ngOnInit()
      }, (error) => {
        console.log(error);

      })

      this.commentForm.resetForm();
    } else {
      this.currentUserId = userId
      this.currentPost = postId

      const submitvalue = {
        userid: userId,
        postid: postId,
        content: this.commentText
      }
      console.log(submitvalue);
      this.commentForm.resetForm();
      this.communityService.postComment(submitvalue).subscribe((Response) => {
        this.ngOnInit()
        console.log("comment response", Response);
      }, (error) => {
        console.log(error);

      })
    }

  }

  // getAllComment() {
  //   this.communityService.getComment().subscribe((Response) => {
  //     console.log("All comments", Response);
  //   }, (error) => {
  //     console.log(error);

  //   })
  // }

  //delete comment
  deleteComment(commentId: string) {
    this.communityService.deleteComment(commentId).subscribe((Response) => {

      if (Response) {
        this.ngOnInit()
      }


    }, (error) => {
      console.log(error);

    })
  }

  // edit comment
  editComment(commentId: string) {
    this.communityService.editComment(commentId).subscribe((Response: any) => {
      this.commentText = Response
      this.editcomment = true
    }, (error) => {
      console.log(error);
    })
  }



  openModal1() {
    this.modalOpen1 = true
  }

  closeModal1() {
    this.modalOpen1 = false
    this.form.reset()
  }


  openEditModal() {
    this.EditModalOpen = true
  }

  closeEditModal() {
    this.EditModalOpen = false

  }
  openFlagModal() {
    this.FlagModalOpen = true
  }

  closeFlagModal() {
    this.FlagModalOpen = false


  }


}