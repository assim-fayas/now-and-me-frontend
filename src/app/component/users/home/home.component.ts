import { Component, OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private http: HttpClient, private Router: Router) { }


  ngOnInit(): void {
    initFlowbite()
  }

  navigateToExpertListing() {
    this.Router.navigate(['/expertlisting'])
  }
  navigateTocommunity(){
    this.Router.navigate(['/community'])
  }


  check() {
    this.http.get('http://localhost:3000/check').subscribe((res: any) => {
      console.log(res);

    }, (err) => {
      console.log(err.error.message);

    })
  }
}
