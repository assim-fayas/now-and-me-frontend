import { Component } from '@angular/core';
import { AdminServiceService } from 'src/app/service/admin-service.service';

@Component({
  selector: 'app-navsidebar',
  templateUrl: './navsidebar.component.html',
  styleUrls: ['./navsidebar.component.css']
})
export class NavsidebarComponent {

  constructor(private adminservice: AdminServiceService) {

  }

  logout() {
    this.adminservice.logout()
  }

}
