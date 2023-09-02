import { Component,OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { AdminServiceService } from 'src/app/service/admin-service.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  constructor(private adminservice:AdminServiceService){}
  ngOnInit(){
    initFlowbite()
    }
    logout(){
      this.adminservice.logout()
    }

}
