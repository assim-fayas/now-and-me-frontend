import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SlotBookingService } from 'src/app/service/slot-booking.service';

@Component({
  selector: 'app-free-slots',
  templateUrl: './free-slots.component.html',
  styleUrls: ['./free-slots.component.css']
})
export class FreeSlotsComponent {
  form!: FormGroup;
  formSubmitted: boolean = false

  constructor(private fb: FormBuilder, private sloteService: SlotBookingService) { }
  ngOnInit() {
    this.form = this.fb.group({
      date: ['', Validators.required],
      startTimeHour: ['', Validators.required],
      startTimeMinute: ['', Validators.required],
      startTimeAmPm: ['', Validators.required],
      endTimeHour: ['', Validators.required],
      endTimeMinute: ['', Validators.required],
      endTimeAmPm: ['', Validators.required],
    });

  }

  onSubmit() {

    this.formSubmitted = true
    if (this.form.valid) {

      this.formSubmitted = false
      console.log("form validddd");
      const { date, startTimeHour, startTimeMinute, startTimeAmPm, endTimeHour, endTimeMinute, endTimeAmPm } = this.form.value;

      const formatTime = (hour: string, minute: string, amPm: string) => {
        return `${hour}:${minute} ${amPm}`;
      };

      const startTime = formatTime(startTimeHour, startTimeMinute, startTimeAmPm);


      const endTime = formatTime(endTimeHour, endTimeMinute, endTimeAmPm);
      const selectedDate = date;


      this.sloteService.addSlots(startTime, endTime, selectedDate).subscribe((response) => {
        console.log(response);
      }, (error) => {
        console.log(error);

      })
      console.log(selectedDate, startTime, endTime);
      this.form.reset();
      console.log('Valid submission.');


    } else {
      console.log('error in form  submission.');
    }



  }





}







