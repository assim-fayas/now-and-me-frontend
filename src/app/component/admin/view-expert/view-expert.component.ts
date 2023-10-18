import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-expert',
  templateUrl: './view-expert.component.html',
  styleUrls: ['./view-expert.component.css']
})
export class ViewExpertComponent implements OnInit {
  constructor(private activateRouter: ActivatedRoute) { }
  id!: string
  ngOnInit() {
    this.activateRouter.params.subscribe(params => {
      this.id = params['id']

    })
  }
}