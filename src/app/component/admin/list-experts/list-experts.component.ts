import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router';
import { AdminServiceService } from 'src/app/service/admin-service.service';
import { ToastrService } from 'ngx-toastr'
@Component({
  selector: 'app-list-experts',
  templateUrl: './list-experts.component.html',
  styleUrls: ['./list-experts.component.css']
})
export class ListExpertsComponent implements OnInit {
  //experts list
  experts: any[] = []
  loadingspinner = false
  constructor(private http: HttpClient,
    private router: Router,
    private adminService: AdminServiceService,
    public toastr: ToastrService) { }

  ngOnInit() {
    this.getExperts()
    //calling get experts for listing experts
  }

  getExperts() {
    this.loadingspinner = true
    this.adminService.getexperts().subscribe(
      (response: any) => {
        console.log(response);

        this.experts = response.allExperts
        this.loadingspinner = false

      },
      (errorMsg) => {
        console.log(errorMsg);

      }

    )
  }
  //blocking experts

  blockexpert(userId: string) {
    console.log(userId, "id of expert");

    this.adminService.blockexpert(userId).subscribe((res: any) => {

      console.log(res);
      this.ngOnInit()
      if (res.message == 'expert un blocked') {
        this.toastr.success(res.message, 'Horrayyy 🎉', {
          timeOut: 2000,
        });
      } else {
        this.toastr.warning(res.message, ' 🎉', {
          timeOut: 2000,
        });
      }
    },
      (errorMsg) => {
        console.log(errorMsg);

        this.toastr.error(errorMsg.message, 'oops😕', {
          timeOut: 2000,
        });
      })
  }

}
