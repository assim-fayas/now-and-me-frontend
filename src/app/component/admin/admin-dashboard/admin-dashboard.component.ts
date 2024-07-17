import { Component, OnInit, importProvidersFrom } from '@angular/core';
import { AdminServiceService } from 'src/app/service/admin-service.service';
import { NgxChartsModule, ScaleType } from '@swimlane/ngx-charts';
import { Color } from '@swimlane/ngx-charts';
import { DataService } from 'src/app/service/data.service';
import { Router } from '@angular/router';
import { ExpertService } from 'src/app/service/expert.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  loadingspinner = true
  view: [number, number] = [450, 320];

  // options
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;



  dashboardCounts!: any
  name: string = "Revenue"

  basicData: any;
  basicOptions: any;

  // single: any[] = [];
  constructor(private dataService: DataService, private adminDashboard: AdminServiceService, private router: Router, private expert: ExpertService) { }

  ngOnInit() {
    this.adminDashboard.adminpieData().subscribe((response: any) => {
      console.log("pie responseeeeeee", response);
      // this.single = response

    }, (error) => {
      console.log(error);
      this.loadingspinner = false
    })


    this.adminDashboard.getDashboardDetails().subscribe((response: any) => {

      console.log(response);

      this.dashboardCounts = response
      for (const name in this.dashboardCounts) {
        if (this.dashboardCounts.hasOwnProperty(name)) {
          if (name === 'chat' || name === 'video') {
            // this.single.push({ name, value: this.dashboardCounts[name] });
          }

        }
      }

      console.log(this.single);

      this.topPerformers()
      this.expertrequst()

    }, (error) => {
      console.log(error);
      this.loadingspinner = false
    })

  }


  colorScheme: Color = {
    name: 'vivid',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };



  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }


  // data goes here
  public single = [
    {
      "name": "Video",
      "value": 24000
    },
    {
      "name": "Chat",
      "value": 21200
    },
    
  ]

  //   {
  //     "name": "China",
  //     "series": [
  //       {
  //         "name": "2018",
  //         "value": 2243772
  //       },
  //       {
  //         "name": "2017",
  //         "value": 1227770
  //       }
  //     ]
  //   },

  //   {
  //     "name": "USA",
  //     "series": [
  //       {
  //         "name": "2018",
  //         "value": 1126000
  //       },
  //       {
  //         "name": "2017",
  //         "value": 764666
  //       }
  //     ]
  //   },

  //   {
  //     "name": "Norway",
  //     "series": [
  //       {
  //         "name": "2018",
  //         "value": 296215
  //       },
  //       {
  //         "name": "2017",
  //         "value": 209122
  //       }
  //     ]
  //   },

  //   {
  //     "name": "Japan",
  //     "series": [
  //       {
  //         "name": "2018",
  //         "value": 257363
  //       },
  //       {
  //         "name": "2017",
  //         "value": 205350
  //       }
  //     ]
  //   },

  //   {
  //     "name": "Germany",
  //     "series": [
  //       {
  //         "name": "2018",
  //         "value": 196750
  //       },
  //       {
  //         "name": "2017",
  //         "value": 129246
  //       }
  //     ]
  //   },

  //   {
  //     "name": "France",
  //     "series": [
  //       {
  //         "name": "2018",
  //         "value": 204617
  //       },
  //       {
  //         "name": "2017",
  //         "value": 149797
  //       }
  //     ]
  //   }
  // ];






  //new chart
  selectData(event: any) {
    console.log(event);
  }

  earningsByExpert!: any

  //top performers
  topPerformers() {
    this.loadingspinner = true
    this.adminDashboard.topPerfomers().subscribe((response: any) => {
      console.log("top performers", response);
      this.earningsByExpert = response.earningsByExpertAndBookingType
      // console.log(" earningsByExpertAndBookingType", this.earningsByExpert);

    }, (error) => {
      console.log(error);
      this.loadingspinner = false

    })
  }


  //expert requests
  unverifiedExperts!: any

  expertrequst() {
    // this.loadingspinner = true
    this.adminDashboard.expertRequest().subscribe((response: any) => {
      this.unverifiedExperts = response.unverifiedExperts
      console.log("expert request", response.unverifiedExperts);
      this.loadingspinner = false

    }, (error) => {
      console.log(error);
      this.loadingspinner = false
    })

  }

  viewExpert(id: string) {
    console.log(id, "id");
    console.log("inside view expert");

    this.router.navigate(['/viewExpert'])
  }


  verifyExpert(id: string) {
    console.log(id);
    this.expert.expertVerification(id).subscribe((response) => {
      console.log(response);
      this.expertrequst()

    }, (error) => {
      console.log(error);

    })

  }



}

