import { Component, OnInit } from '@angular/core';
import { ExpertService } from 'src/app/service/expert.service';

@Component({
  selector: 'app-expert-home',
  templateUrl: './expert-home.component.html',
  styleUrls: ['./expert-home.component.css']
})
export class ExpertHomeComponent implements OnInit {

  constructor(private expertDetails: ExpertService) { }

  ngOnInit() {
    this.getDashBoardDetails()
  }

  dasboardDetails!: any

  getDashBoardDetails() {
    this.expertDetails.getDashboardDetails().subscribe((response) => {
      this.dasboardDetails = response
      console.log(response);

    }, (error) => {
      console.log(error);

    })
  }

}
