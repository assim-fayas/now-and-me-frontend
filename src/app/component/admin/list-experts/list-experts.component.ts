import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router';
import { AdminServiceService } from 'src/app/service/admin-service.service';

@Component({
  selector: 'app-list-experts',
  templateUrl: './list-experts.component.html',
  styleUrls: ['./list-experts.component.css']
})
export class ListExpertsComponent implements OnInit {
  //experts list
  experts: any[] = []

  constructor(private http: HttpClient,
    private router: Router,
    private adminService: AdminServiceService) { }

  ngOnInit() {
    this.getExperts()
    //calling get experts for listing experts
  }

  getExperts() {
    this.adminService.getexperts().subscribe(
      (response) => {

        this.experts = response.allExperts
      },
      (errorMsg) => {
        console.log(errorMsg);

      }

    )
  }
//blocking experts

  blockexpert(userId: string) {

    this.adminService.blockexpert(userId).subscribe((res) => {
      console.log(res);
      this.ngOnInit()

    },
      (errormsg) => {
        console.log(errormsg);

      })
  }

}
