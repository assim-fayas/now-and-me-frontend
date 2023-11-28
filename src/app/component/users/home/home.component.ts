import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private Router: Router) { }
  showaccordion!: number

  navigateToExpertListing() {
    this.Router.navigate(['/expertlisting'])
  }
  navigateTocommunity() {
    this.Router.navigate(['/community'])
  }

  navigateToappoinments() {
    this.Router.navigate(['/schedules'])
  }

  showAccordion(value: number) {
    if (this.showaccordion == value) {
      this.showaccordion = 0
    } else {
      this.showaccordion = value
    }

  }

}
