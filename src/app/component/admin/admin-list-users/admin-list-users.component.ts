import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router';
import { AdminServiceService } from 'src/app/service/admin-service.service';
import { UserServiceService } from 'src/app/service/user-service.service';
import { LoadingSpinnerComponent } from 'src/app/shared/loading-spinner';
import { ListUsers } from '../adminModel';
import { ToastrService } from 'ngx-toastr'
import { error } from 'jquery';
@Component({
  selector: 'app-admin-list-users',
  templateUrl: './admin-list-users.component.html',
  styleUrls: ['./admin-list-users.component.css']
})
export class AdminListUsersComponent implements OnInit {
  loadingspinner = true
  displayedColumn: string[] = ['No', 'Name', 'Email', 'Joined ', 'Action', 'Edit', 'view']
  // dataSource!:MatTableDataSource< ListUsers>
  //users list
  users: any[] = []

  constructor(private http: HttpClient,
    private router: Router,
    private adminService: AdminServiceService,
    private userService: UserServiceService,
    public toastr: ToastrService) { }


  ngOnInit() {


    //calling to get users for listing users
    this.getusers()
  }

  getusers() {
    this.adminService.getusers().subscribe(
      (response: any) => {
        console.log(response);
        this.users = response.allUsers
        console.log(this.users, "users");
        // this.dataSource= new MatTableDataSource(this.users)
        this.loadingspinner = false
      },
      (errorMsg) => {
        console.log(errorMsg);
        this.loadingspinner = false
      }
    )
  }

  // blocking users
  blockuser(expertId: string) {

    this.adminService.blockuser(expertId).subscribe((res: any) => {
      console.log(res);
      this.ngOnInit()

      if (res.message == "user unblockeddd") {
        this.toastr.success(res.message, 'user  🎉', {
          timeOut: 2000,
        });
      } else {
        this.toastr.warning(res.message, '', {
          timeOut: 2000,
        });
      }
    }, (error) => {
      console.log(error);
      this.toastr.error('Something went wrong', 'oops😕', {
        timeOut: 2000,
      });
    })
  }


}
