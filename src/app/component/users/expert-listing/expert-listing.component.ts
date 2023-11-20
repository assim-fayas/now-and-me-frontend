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
  [x: string]: any;

  //loading spinner
  isLoading: boolean = false

  constructor(private expertService: ExpertService, private router: Router) { }

  ngOnInit(): void {
    this.expertListing()
  }

  listExperts!: any
  RatingCount!: number
  expertCategories: any[] = []


  //expertlisting
  expertListing() {
    this.isLoading = true
    this.expertService.expertListing().subscribe((response: any) => {
      this.listExperts = response.allExperts

      const set = new Set()

      const expertsCategory = response.allExperts.forEach((value: any) => {
        // const rslt = set.add(value.specialization)

        // console.log("set", rslt);
        set.add(value.specialization);

      })
      this.expertCategories.push(Array.from(set));
      console.log("cat", this.expertCategories);

      this.isLoading = false
    }, (error) => {
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


  // expert sorting
  selectedOption = 'all'
  onFilterChange() {
    if (this.selectedOption == 'all') {
      this.expertCategories = []
      this.expertListing()
    } else {
      console.log(this.selectedOption);

      this.expertService.expertFiltering(this.selectedOption).subscribe((response: any) => {
        console.log(response);
        this.listExperts = response.allExperts

      }, (error) => {
        console.log(error);

      })
    }

  }

}





