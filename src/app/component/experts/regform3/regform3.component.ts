import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-regform3',
  templateUrl: './regform3.component.html',
  styleUrls: ['./regform3.component.css']
})
export class Regform3Component {

  constructor(private router:Router){}
  
  inputtext1: string = ''


  public isEmojiPickerVisible!: boolean;


  public addEmoji(event: any) {
    this.inputtext1 = `${this.inputtext1}${event.emoji.native}`;
    this.isEmojiPickerVisible = false;
  }
 
  submit(){
    this.router.navigate(['/experts/experts'])
  }

}
