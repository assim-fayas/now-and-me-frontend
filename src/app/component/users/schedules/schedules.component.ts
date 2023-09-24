import { Component } from '@angular/core';

@Component({
  selector: 'app-schedules',
  templateUrl: './schedules.component.html',
  styleUrls: ['./schedules.component.css']
})
export class SchedulesComponent {

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












