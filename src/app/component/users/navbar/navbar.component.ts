import { Component, OnInit } from '@angular/core';
import { UserServiceService } from 'src/app/service/user-service.service';
import { LoginResponse } from 'src/app/models';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user!: LoginResponse | null;

  constructor(private userService: UserServiceService) {

  }
  ngOnInit(): void {
    this.userService.user.subscribe(x => {
      this.user = x
    })
  }

  logout() {
    this.userService.logout()
  }
}
