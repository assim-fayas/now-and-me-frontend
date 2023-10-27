import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SlotBookingService } from 'src/app/service/slot-booking.service';
import { ToastrService } from 'ngx-toastr'
@Component({
  selector: 'app-free-slots',
  templateUrl: './free-slots.component.html',
  styleUrls: ['./free-slots.component.css']
})
export class FreeSlotsComponent {
  form!: FormGroup;
  formSubmitted: boolean = false
  loadingspinner = false
  constructor(private fb: FormBuilder, private sloteService: SlotBookingService, public toastr: ToastrService) { }
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
    this.loadingspinner == true
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

      console.log(startTime, endTime, selectedDate);

      this.sloteService.addSlots(startTime, endTime, selectedDate).subscribe((response: any) => {
        this.loadingspinner == false
        console.log(response);
        this.toastr.success('Slots Added Successfully', 'Horrayyy 🎉', {
          timeOut: 2000,
        });
      }, (error) => {
        console.log(error);
        this.toastr.error(error.message, 'oops😕', {
          timeOut: 2000,
        });

      })
      console.log(selectedDate, startTime, endTime);
      this.form.reset();
      console.log('Valid submission.');


    } else {
      console.log('error in form  submission.');
      this.toastr.error('error in form  submission', 'oops😕', {
        timeOut: 2000,
      });
    }



  }





}







