import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-expert-dashboard',
  templateUrl: './expert-dashboard.component.html',
  styleUrls: ['./expert-dashboard.component.css']
})
export class ExpertDashboardComponent {

  constructor(private router: Router) {

  }

  ExpertRegiterForm() {
    console.log("clicked");

    this.router.navigate(['/experts/registration'])
  }
  expertLogin() {
    console.log("clicked");
    this.router.navigate(['/experts/login'])

  }

}
