import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { NotificationService } from '../service/notification.service';
import { NotificationType } from '../models';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule, SlickCarouselModule],
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent {

  slides = [
    { image: "/assets/image/psycologist sample.png", name: "Asim", category: "Life Coach" },
    { image: "/assets/image/psycologist sample.png", name: "Vivek", category: "Counseling Psychologist" },
    { image: "/assets/image/psycologist sample.png", name: "Akhil", category: "Clinical Psychologist" },
    { image: "/assets/image/psycologist sample.png", name: "Janna", category: "Mindset Transformation Coach" },
    { image: "/assets/image/psycologist sample.png", name: "Adhil", category: "Therapist" },
    { image: "/assets/image/psycologist sample.png", name: "Sufad", category: "Peer Listner" },
    { image: "/assets/image/psycologist sample.png", name: "Siru", category: "Life Coach" },
  ];
  slideConfig = {
    slidesToShow: 4,
    slidesToScroll: 1,
    "dots": true,
    "infinite": true,
    "showArrow": true,
    "autoplay": true,
    "autoplaySpeed": 1000,
    "speed": 3000,
    prevArrow: '<button class="slick-prev">Previous</button>',
    nextArrow: '<button class="slick-next">Next</button>',
  };


  slickInit(e: any) {
    console.log('slick initialized');
  }
  breakpoint(e: any) {
    console.log('breakpoint');
  }
  afterChange(e: any) {
    console.log('afterChange');
  }
  beforeChange(e: any) {
    console.log('beforeChange');
  }

  ngOnInit(): void {
    console.log(this.slides);

  }
  constructor(private notificatonservice:NotificationService){}
  showMessage(){
this.notificatonservice.sendMessage({
  message:'New message from a different comp',
  type:NotificationType.success
})
  }
}