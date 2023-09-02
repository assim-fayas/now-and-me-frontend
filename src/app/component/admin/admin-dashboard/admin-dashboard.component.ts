import { Component,OnInit  } from '@angular/core';
import { initFlowbite } from 'flowbite';
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent  implements OnInit{

ngOnInit(){
initFlowbite()
}


}
