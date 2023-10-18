import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-expmailverification',
  templateUrl: './mailverification.component.html',
  styleUrls: ['./mailverification.component.css']
})
export class MailverificationComponent implements OnInit {
  // url
  readonly url = environment.api

  token?: string
  expertId?: string
  constructor(private router: Router,
    private http: HttpClient,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    //getting tokn from url
    this.route.params.subscribe(params => {
      this.token = params['token']
    });
    //getting user id from url 
    this.route.params.subscribe(params => {
      this.expertId = params['id']
    })
  }

  //mail validating
  submit() {
    this.http.get(`${this.url}/experts/expert/${this.expertId}/verify/${this.token}`).subscribe(() => {

      this.router.navigate(['/experts/login'])
    },
      (err) => {
        console.log(err.message);

      })


  }
}
