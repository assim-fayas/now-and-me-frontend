import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { communityPost } from '../models';
import { catchError, map } from 'rxjs/operators'
import { throwError } from 'rxjs';
import { FlagFormvalue } from '../models';
import { CommentFormValue } from '../models';
@Injectable({
  providedIn: 'root'
})
export class CommunityService {

  constructor(private http: HttpClient, router: Router) { }

  private readonly url = environment.api


  // thoughts sharing 
  postThoughts(thought: communityPost) {
    return this.http.post(`${this.url}/thoughts`, thought, { withCredentials: true })
      .pipe(map(response => {
        return response
      }),
        catchError((error) => {
          return throwError(error)
        })
      )
  }


  // thoughts listing

  listThoughts() {
    return this.http.get(`${this.url}/listThoughts`, { withCredentials: true })
      .pipe(map(response => {
        return response
      }),
        catchError((error) => {
          return throwError(error)
        }))
  }

  //thought of specific use
  thoughtOfSpecificUser() {
    return this.http.get(`${this.url}/thoughtSingleUser`, { withCredentials: true })
      .pipe(map(response => {
        return response
      }),
        catchError((error) => {
          return throwError(error)
        }))
  }


  //add like
  addLike(id: string) {
    return this.http.post(`${this.url}/addLike/${id}`, { withCredentials: true })
      .pipe(map(response => {
        return response
      }),
        catchError((error) => {
          return throwError(error)
        }))
  }

  //count of comments and likes

  countOfCommentsandLikes() {
    return this.http.get(`${this.url}/commentsAndLikeCount`, { withCredentials: true })
      .pipe(map(response => {
        return response
      }),
        catchError((error) => {
          return throwError(error)
        }))
  }


  //edit post
  editPost(postid: string) {
    return this.http.post(`${this.url}/editPost/${postid}`, { withCredentials: true })
      .pipe(map(Response => {
        return Response
      }),
        catchError((error) => {
          return throwError(error)
        }))
  }

  updatePost(postid: string, FormValue: communityPost) {
    return this.http.post(`${this.url}/updatePost/${postid}`, FormValue, { withCredentials: true })
      .pipe(map(Response => {
        return Response
      }),
        catchError((error) => {
          return throwError(error)
        }))
  }

  //delete post
  deletePost(postid: string) {
    return this.http.post(`${this.url}/deletePost/${postid}`, { withCredentials: true })
      .pipe(map(Response => {
        return Response
      }),
        catchError((error) => {
          return throwError(error)
        }))
  }

  // flag post
  flagPost(postid: string, formvalue: FlagFormvalue) {
    return this.http.post(`${this.url}/flagPost/${postid}`, formvalue, { withCredentials: true })
      .pipe(map(Response => {
        return Response
      }),
        catchError((error) => {
          return throwError(error)
        }))
  }

  // post comment
  postComment(formvalue: CommentFormValue) {
    return this.http.post(`${this.url}/postComment`, formvalue, { withCredentials: true })
      .pipe(map(Response => {
        return Response
      }),
        catchError((error) => {
          return throwError(error)
        }))
  }


  //delete comment
  deleteComment(id: string) {
    return this.http.post(`${this.url}/deleteComment/${id}`, { withCredentials: true })
      .pipe(map(Response => {
        return Response
      }),
        catchError((error) => {
          return throwError(error)
        }))
  }


  //edit comment
  editComment(id: string) {
    return this.http.post(`${this.url}/editComment/${id}`, { withCredentials: true })
      .pipe(map(Response => {
        return Response
      }),
        catchError((error) => {
          return throwError(error)
        }))
  }

  //update comment
  updateComment(commentId: string, comment: string) {
    return this.http.patch(`${this.url}/updateComment/${commentId}`, { comment }, { withCredentials: true })
      .pipe(map(Response => {
        return Response
      }),
        catchError((error) => {
          return throwError(error)
        }))
  }

  getFlagedPosts() {
    return this.http.get(`${this.url}/getFlaggedPosts`, { withCredentials: true })
      .pipe(map(Response => {
        return Response
      }),
        catchError((error) => {
          return throwError(error)
        }))
  }

  getSpecificPost(id: string) {
    return this.http.post(`${this.url}/getSingleTHoughts/${id}`, { withCredentials: true })
      .pipe(map(Response => {
        return Response
      }),
        catchError((error) => {
          return throwError(error)
        }))
  }

  sendMail(id: string, postid: string) {
    return this.http.post(`${this.url}/admin/sendmail/${id}/${postid}`, { withCredentials: true })
      .pipe(map(Response => {
        return Response
      }),
        catchError((error) => {
          return throwError(error)
        }))
  }

  blockPost(id: string, postid: string) {
    return this.http.post(`${this.url}/admin/blockPost/${id}/${postid}`, { withCredentials: true })
      .pipe(map(Response => {
        return Response
      }),
        catchError((error) => {
          return throwError(error)
        }))

  }
}



