import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router';
import { AdminServiceService } from 'src/app/service/admin-service.service';
import { LoadingSpinnerComponent } from 'src/app/shared/loading-spinner';
@Component({
  selector: 'app-list-experts',
  templateUrl: './list-experts.component.html',
  styleUrls: ['./list-experts.component.css']
})
export class ListExpertsComponent implements OnInit {
  //experts list
  experts: any[] = []
  loadingspinner = true
  constructor(private http: HttpClient,
    private router: Router,
    private adminService: AdminServiceService) { }

  ngOnInit() {
    this.getExperts()
    //calling get experts for listing experts
  }

  getExperts() {
    this.adminService.getexperts().subscribe(
      (response: any) => {
        console.log(response);

        this.experts = response.allExperts
        this.loadingspinner = false
      },
      (errorMsg) => {
        console.log(errorMsg);
        this.loadingspinner = false
      }

    )
  }
  //blocking experts

  blockexpert(userId: string) {
    console.log(userId, "id of expert");
    this.loadingspinner = true
    this.adminService.blockexpert(userId).subscribe((res) => {
      this.loadingspinner = false
      console.log(res);
      this.ngOnInit()

    },
      (errormsg) => {
        console.log(errormsg);
        this.loadingspinner = false
      })
  }

}
