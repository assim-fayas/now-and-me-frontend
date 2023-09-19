import { Component, OnInit } from '@angular/core';
import { UserServiceService } from 'src/app/service/user-service.service';
import { LoginResponse } from 'src/app/models';
import { initFlowbite } from 'flowbite';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {


  constructor(private userService: UserServiceService) {

  }
  ngOnInit(): void {
    initFlowbite()
  }

  logout() {
    this.userService.logout()
  }
}
