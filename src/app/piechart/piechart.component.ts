import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { FormsModule } from '@angular/forms';
import { Color } from '@swimlane/ngx-charts';
import { ScaleType } from '@swimlane/ngx-charts';
import { LegendPosition } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-piechart',
  standalone: true,
  imports: [CommonModule, NgxChartsModule, FormsModule],
  templateUrl: './piechart.component.html',
  styleUrls: ['./piechart.component.css']
})
export class PiechartComponent {

  @Input() single: any = []
  @Input() name!: string


  // value!: any[]
  // single!: any[];
  view: [number, number] = [450, 320];

  // options
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;


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
  // public single = [
  //   {
  //     "name": "China",
  //     "value": 2243772
  //   },
  //   {
  //     "name": "USA",
  //     "value": 1126000
  //   },
  //   {
  //     "name": "Norway",
  //     "value": 296215
  //   },
  //   {
  //     "name": "Japan",
  //     "value": 257363
  //   },
  //   {
  //     "name": "Germany",
  //     "value": 196750
  //   },
  //   {
  //     "name": "France",
  //     "value": 204617
  //   }
  // ]

  // public multi = [
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








}



