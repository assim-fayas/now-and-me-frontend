import { Component } from '@angular/core';

@Component({
  selector: 'app-appoinments',
  templateUrl: './appoinments.component.html',
  styleUrls: ['./appoinments.component.css']
})
export class AppoinmentsComponent {


  schedules: boolean = true
  previouseSchedules:boolean=false

showSchedules(){
this.schedules=true
this.previouseSchedules=false
}
showpreviouseSchedules(){
this.schedules=false
this.previouseSchedules=true
}


}
