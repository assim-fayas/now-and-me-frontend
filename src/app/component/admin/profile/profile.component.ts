import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/service/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  admin!: any
  constructor(private adminProfile: ProfileService) { }
  ngOnInit(): void {
    this.profile()
  }

  profile() {
    this.adminProfile.adminProfile().subscribe((response) => {
      this.admin = response
      console.log(this.admin);

    }, (error) => {
      console.log(error);

    })
  }


}
