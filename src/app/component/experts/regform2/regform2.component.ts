import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-regform2',
  templateUrl: './regform2.component.html',
  styleUrls: ['./regform2.component.css']
})
export class Regform2Component {
  constructor(private router: Router) { }
  submit() {
    this.router.navigate(['/experts/regform3'])
  }
}
