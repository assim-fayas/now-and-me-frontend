import { Component, ViewChild,OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgForm, NgModel } from '@angular/forms';
import { Languages } from 'src/app/models'
import { IdealClient } from 'src/app/models'
import { Expertise } from 'src/app/models'
import { ExpertService } from 'src/app/service/expert.service';

@Component({
  selector: 'app-regform3',
  templateUrl: './regform3.component.html',
  styleUrls: ['./regform3.component.css']
})
export class Regform3Component  implements OnInit {

  constructor(private router: Router, private expertService: ExpertService,private Route:ActivatedRoute) { }

  ngOnInit(): void {
    this.Route.params.subscribe((params)=>{
      this.expertId=params['id']
    })
  }

  expertId!: string
  form3Submitted = false
  textboxes: any[] = [{ inputText: '', isEmojiPickerVisible: false }];

  addTextbox() {
    if (this.textboxes.length < 3) {
      this.textboxes.push({ inputText: '', isEmojiPickerVisible: false });
    }
  }

  removeTextbox(index: number) {
    this.textboxes.splice(index, 1);
  }

  toggleEmojiPicker(index: number) {
    this.textboxes[index].isEmojiPickerVisible = !this.textboxes[index].isEmojiPickerVisible;
  }

  addEmoji(event: any, index: number) {
    this.textboxes[index].inputText += event.emoji.native;
  }



  // emoji picker
  inputtext1: string = ''
  public isEmojiPickerVisible!: boolean;
  // public addEmoji(event: any) {
  //   this.inputtext1 = `${this.inputtext1}${event.emoji.native}`;
  //   this.isEmojiPickerVisible = false;
  // }


  // form value
  services!: any
  shortBio: string = ''
  websiteLinks: string = '';
  hourlySessionCharge: string = '';

  languages: Languages = {
    english: false,
    malayalam: false,
    hinglish: false,
    otherLanguage: false,
    customlanguageValue: ''
  };

  idealClientele: IdealClient = {
    students: false,
    youngAdults: false,
    workingProfessionals: false,
    teenagers: false,
    jobAspirants: false,
    marriedCouples: false,
    parents: false,
    other: false,
    customclientValue: ''
  };

  expertise: Expertise = {
    life: false,
    positivity: false,
    relationships: false,
    career: false,
    mindset: false,
    family: false,
  };


  @ViewChild('myForm', { static: false }) myForm!: NgForm;


  //form submission

  submitForm(form: NgForm) {

    console.log(form.value.input);


    this.form3Submitted = true
    console.log("clicked");

    if (this.myForm.valid) {
      console.log("inside submitted");

      let formvalue = this.formStructuring(this.myForm.value)
      this.expertService.registerForm3(formvalue,this.expertId).subscribe((response)=>{
        console.log(response);
        form.resetForm();
        this.router.navigate(['/experts/experts'])
      },(error)=>{
        console.log(error);
        
      })
     
    
    }
  }


  //form value structring

  formStructuring(formvalue: any) {

    const structuredForm = {
      shortBio: formvalue.shortBio,
      websiteLinks: formvalue.websiteLinks,
      services: [formvalue.inputtext0, formvalue.inputtext1, formvalue.inputtext2],
      hourlySessionCharge: formvalue.hourlySessionCharge,
      languages: this.getSelectedLanguages(),
      idealClient: this.getSelectedIdealClientele(),
      expertise: this.getSelectedExpertise
    }


    return structuredForm

  }


  // helper functions



  languagesSelected() {
    return Object.values(this.languages).some(value => value === true);
  }
  idealclientSelect() {
    return Object.values(this.idealClientele).some(value => value === true);
  }
  hasSelectedExpertise() {

    return Object.values(this.expertise).some(value => value === true);
  }
  validateOtherClientele(control: NgModel): { [key: string]: any } | null {
    if (this.idealClientele.other && !control.value) {
      return { 'customValueRequired': true };
    }
    return null;
  }






  getSelectedLanguages() {
    const selectedLanguages: (string | null)[] = [];

    // Iterate through the keys of the 'languages' object
    for (const key of Object.keys(this.languages) as (keyof Languages)[]) {
      // Check if the value is true or if it's 'customlanguageValue' and not empty
      if (this.languages[key] === true || (key === 'customlanguageValue' && this.languages[key] !== '')) {
        if (key === 'customlanguageValue') {
          selectedLanguages.push(this.languages[key]);
        } else {
          selectedLanguages.push(key);
        }
      }
    }

    return selectedLanguages.filter(Boolean); // Filter out null values (if any)
  }


  getSelectedIdealClientele() {
    const selectedClientele: (string | null)[] = [];

    // Iterate through the keys of the 'idealClientele' object
    for (const key of Object.keys(this.idealClientele) as (keyof IdealClient)[]) {
      // Skip the 'other' key
      if (key === 'other') {
        continue;
      }

      // Check if the value is true or if it's 'customclientValue' and not empty
      if (this.idealClientele[key] === true || (key === 'customclientValue' && this.idealClientele[key] !== '')) {
        if (key === 'customclientValue') {
          selectedClientele.push(this.idealClientele[key]);
        } else {
          selectedClientele.push(key);
        }
      }
    }

    return selectedClientele.filter(Boolean); // Filter out null values (if any)
  }


  getSelectedExpertise() {
    const selectedExpertise: string[] = [];

    // Iterate through the keys of the 'idealClientele' object
    for (const key of Object.keys(this.expertise) as (keyof Expertise)[]) {
      // Check if the value is true or if it's 'customclientValue' and not null
      if (this.expertise[key] === true) {
        selectedExpertise.push(key);
      }
    }

    return selectedExpertise
  }







}