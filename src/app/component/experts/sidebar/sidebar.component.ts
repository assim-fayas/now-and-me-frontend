import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {


  isSidebarOpen = true; // Sidebar is initially open on medium screens

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}
