import { Component, OnInit, } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExpertService } from 'src/app/service/expert.service';



@Component({
  selector: 'app-view-expert',
  templateUrl: './view-expert.component.html',
  styleUrls: ['./view-expert.component.css']
})
export class ViewExpertComponent implements OnInit {
  isReadMore = true;
  currentExpertId!: string
  expertView!: any
  showSlots: boolean = false
  bookingType = ''

  constructor(private activateRouter: ActivatedRoute, private expertService: ExpertService) { }

  ngOnInit() {
    this.activateRouter.params.subscribe(params => {
      this.currentExpertId = params['id']
      this.viewExpert()

    })
  }


  viewExpert() {
    this.expertService.viewExpert(this.currentExpertId).subscribe((response) => {
      this.expertView = response
    }, (error) => {
      console.log(error);

    })
  }


  showText() {
    this.isReadMore = !this.isReadMore;
  }


  BookVideo() {
    if (this.showSlots == false) {
      this.showSlots = true
      this.bookingType = 'video'
    } else {
      this.showSlots = false
      this.bookingType = ''
    }
  }


  BookChat() {
    if (this.showSlots == false) {
      this.showSlots = true
      this.bookingType = 'chat'
    } else {
      this.showSlots = false
      this.bookingType = ''
    }

  }















}
