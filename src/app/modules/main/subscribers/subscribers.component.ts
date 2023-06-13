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
  invalidForm: boolean = false;

  subId: number = 0;
  name: string = '';
  email: string =  '';
  countryCody: string = '';
  phoneNumbe: string = '';
  area: string = '';
  jobTitle: string = '';
  topics: [] = []; 

  subscribers: any[] = [ 
    { "SystemId": null, "Area": "", "PublicId": 161, "CountryCode": "CO", "CountryName": "Colombia", "Name": "prueba", "Email": "carlosurrego82@gmail.com", "JobTitle": "", "PhoneNumber": "3148654325", "PhoneCode": "57", "PhoneCodeAndNumber": "(57) 3148654325", "LastActivityUtc": null, "LastActivity": null, "SubscriptionDate": null, "SubscriptionMethod": 0, "SubscriptionState": 0, "SubscriptionStateDescription": "Pendiente", "Topics": [], "Activity": "--", "ConnectionState": 2, "Id": 7914 }, 
    { "SystemId": null, "Area": "Desarrollo", "PublicId": 162, "CountryCode": "CO", "CountryName": "Colombia", "Name": "Carlos Urrego", "Email": "carlos.urrego@tekus.co", "JobTitle": "QA", "PhoneNumber": "3102001350", "PhoneCode": "57", "PhoneCodeAndNumber": "(57) 3102001350", "LastActivityUtc": "2021-02-27T01:41:24.377", "LastActivity": "2021-02-26T20:41:24.377", "SubscriptionDate": "22/02/2021 4:36 p. m.", "SubscriptionMethod": 0, "SubscriptionState": 1, "SubscriptionStateDescription": "Activo", "Topics": [], "Activity": "5d 15h ", "ConnectionState": 2, "Id": 7927 } 
  ];
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
      return;
    }
  }

  changeDeleteAction(): void {
    this.deleteAction = !this.deleteAction
  }

  changeCreateAction(): void {
    this.createAction = true
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
      this.invalidForm = true
      return;
    }
  
    this.invalidForm = false

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
      this.invalidForm = true
      return;
    }
  
    this.invalidForm = false
  
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
        next: (response) => this.subscribers = response.Data,
        error: (e) => console.error(e),
        complete: () => console.info('complete') 
      }
    );
  }

  searchSubscribersById(): void {
    this.subscribersService.getSubscriberById(this.subId).subscribe(
      {
        next: (response) => this.subscribers = [response],
        error: (e) => console.error(e),
        complete: () => console.info('complete')
      }
    )
  }

  deleteSubscriberById(Id: number): void {
    this.subscribersService.deleteSubscriberById(Id).subscribe(
      {
        next: (response) => console.log(response),
        error: (e) => console.error(e),
        complete: () => this.searchSubscribers() 
      }
    );
  }

  setSubscriber(subscriber: any): void {
    this.subscriberId = subscriber.Id
    this.subscriberForm.patchValue({
          name: subscriber.Name,
          email: subscriber.Email,
          countryCode: subscriber.CountryCode,
          phoneNumber: subscriber.PhoneNumber,
          area: subscriber.Area,
          jobTitle: subscriber.JobTitle,
          topics: subscriber.Topics
        }
    );
    this.createAction = false
  }

}
