import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { ExpertService } from 'src/app/service/expert.service';
import { environment } from 'src/environments/environment';



@Component({
  selector: 'app-expert-listing',
  templateUrl: './expert-listing.component.html',
  styleUrls: ['./expert-listing.component.css']
})
export class ExpertListingComponent implements OnInit {

  //loading spinner
  isLoading: boolean = false

  constructor(private expertService: ExpertService, private router: Router) { }

  ngOnInit(): void {
    this.expertListing()
  }

  listExperts!: any
  RatingCount!: number



  //expertlisting
  expertListing() {
    this.isLoading = true
    this.expertService.expertListing().subscribe((response: any) => {
      this.listExperts = response.allExperts
      console.log(this.listExperts);

      this.isLoading = false
    }, (error) => {
      console.log(error);
      this.isLoading = false

    })
  }

  viewExpert(id: string) {
    console.log("expert id", id);

    console.log("inside view expert");

    this.router.navigate(['expertView', id])
  }

  hexToDecimal(hexValue: string): number {
    return parseInt(hexValue.slice(-3), 16);
  }


}



