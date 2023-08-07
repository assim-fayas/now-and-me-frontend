import { Component} from '@angular/core';
import { NgForm } from '@angular/forms'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(){}   
  

  onSubmit(form: NgForm) {
    console.log(form);

  }

  //timer function
  startTimer: boolean = false
  remainingTime:number=60
  timerValue!:any

  
  timer(){
    this.startTimer=true
    this.startCounter()
    console.log(this.startTimer);
    console.log(this.timerValue);
      }
  
    resetTimer() {
      this.startTimer = false
      this.remainingTime=60
      console.log(this.startTimer);
    }

    startCounter(): void {
      if (!this.startTimer) {
        return; 
      }
    
      this.timerValue = setInterval(() => {
        if (!this.startTimer) {
          this.resetTimer();
          clearInterval(this.timerValue);
          return;
        }
    
        if (this.remainingTime > 1) {
          this.remainingTime--;
        } else {
          this.resetTimer();
          clearInterval(this.timerValue);
        }
      }, 1000);
    }
   

   








}



