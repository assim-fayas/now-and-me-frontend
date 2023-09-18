import { Component, OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent  implements OnInit{

  ngOnInit(): void {
    initFlowbite()
  }
}
