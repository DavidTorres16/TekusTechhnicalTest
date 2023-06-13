import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { SubscribersService } from 'src/app/services/subscribers/subscribers.service';
import { CountriesService } from 'src/app/services/countries/countries.service';


@Component({
  selector: 'app-subscribers',
  templateUrl: './subscribers.component.html',
  styleUrls: ['./subscribers.component.scss']
})
export class SubscribersComponent implements OnInit {

  subscriberId: number = 0;

  countriesList: any[] = []

  topicsList: string[] = [
    "professor",
    "Policeman",
    "Doctor",   
    "Plumber",
    "Software architect"
  ];

  createAction: boolean = true;
  deleteAction: boolean = false;

  name: string = '';
  email: string =  '';
  countryCody: string = '';
  phoneNumbe: string = '';
  area: string = '';
  jobTitle: string = '';
  topics: [] = []; 

  subscribers: any[] = [];
  searchCriteria: string = "";
  searchPage: number = 0;
  searchCount: number = 0;
  searchSortOrder: string = "";
  searchSortType: string = "";

  public subscriberForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    countryCode: new FormControl('', Validators.required),
    phoneNumber: new FormControl(''),
    area: new FormControl(''),
    jobTitle: new FormControl(''), 
    topics: new FormControl([])
  });

  constructor(private formBuilder: FormBuilder, private subscribersService: SubscribersService, private countriesService: CountriesService ) {   } 

  ngOnInit(): void {  
    this.getCountries()
  }   

  onSubmit(): void {
    if (this.subscriberForm.invalid) {
      // Handle invalid form submission
      return;
    }

    // Form is valid, proceed with submission
    const formData = this.subscriberForm.value;
    // ...
  }

  getCountries(): void {
    this.countriesService.getCountries().subscribe(
      {
        next: (response) => this.countriesList = response.Data,
        error: (e) => console.error(e),
        complete: () => console.info('complete') 
      }
    );
  }

  createSubscriber(): void {
    if (this.subscriberForm.invalid) {

      return;
    }
  
    const formData = this.subscriberForm.value;
    
    this.subscribersService.createSubscribers([formData]).subscribe(
      {
        next: (response) => {
          console.log(response);
          
        },
        error: (e) => {
          console.error(e);
        },
        complete: () => {
          console.info('complete');
        } 
      }
    );
  }

  updateSubscriber(): void {
    if (this.subscriberForm.invalid) {

      return;
    }
  
    const formData = this.subscriberForm.value;
    
    const subscriberId = this.subscriberId;
    this.subscribersService.updateSubscriberById(subscriberId, formData).subscribe(
      {
        next: (response) => {
    
        },
        error: (e) => {
    
          console.error(e);
        },
        complete: () => {
    
          console.info('complete');
        } 
      }
    );
  }

  searchSubscribers(): void {
    const sortType = parseInt(this.searchSortType, 10);

    this.subscribersService.getSusbcribers(
      this.searchCriteria,
      this.searchPage,
      this.searchCount,
      this.searchSortOrder,
      sortType
    ).subscribe(
      {
        next: (response) => this.subscribers = response.subscribers,
        error: (e) => console.error(e),
        complete: () => console.info('complete') 
      }
    );
  }

  deleteSubscriberById(Id: number): void {
    
  }

  setSubscriber(): void {

  }

}
