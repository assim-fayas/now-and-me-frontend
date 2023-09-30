import { Component } from '@angular/core';
import { ExpertService } from 'src/app/service/expert.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  constructor(private expert: ExpertService) { }

  isSidebarOpen = true; // Sidebar is initially open on medium screens

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }



  logout() {
    this.expert.logout()
  }
}
