import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr'
@Component({
  selector: 'app-schedules',
  templateUrl: './schedules.component.html',
  styleUrls: ['./schedules.component.css']
})
export class SchedulesComponent {

  constructor(public toastr: ToastrService) { }

  showChats: boolean = true
  showAppoinments: boolean = false


  changeSectionToAppoinments() {
    this.showChats = false
    this.showAppoinments = true

  }

  changeSectionToChats() {
    this.showChats = true
    this.showAppoinments = false
  }






}












