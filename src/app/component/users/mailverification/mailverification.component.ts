import { Component,OnInit } from '@angular/core';
import{environment} from 'src/environments/environment'
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import {HttpClient}  from '@angular/common/http'

@Component({
  selector: 'app-mailverification',
  templateUrl: './mailverification.component.html',
  styleUrls: ['./mailverification.component.css']
})
export class MailverificationComponent implements OnInit {
readonly url=environment.apiBaseUrl
  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  public param: string = ''
  public id: string = ''


  ngOnInit(): void {
    //getting tokn from url
    this.route.params.subscribe(params => {
      this.param = params['token'];
    });
    //getting userId from url
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
  }

  //mail validating
  submit() {
    this.http.get(`${this.url}/user/${this.id}/verify/${this.param}`).subscribe(
      () => {
        this.router.navigate(['/login']);
      },
      (err) => {
       console.log( console.log(err))
     
       
      }
    );
  }


}
