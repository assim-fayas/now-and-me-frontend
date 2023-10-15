import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/service/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private expertProfile: ProfileService) {

  }
  ngOnInit(): void {
    this.profile()
  }


  profile() {
    this.expertProfile.expertProfile().subscribe((response) => {
      console.log(response);

    }, (error) => {
      console.log(error);

    })
  }

}
