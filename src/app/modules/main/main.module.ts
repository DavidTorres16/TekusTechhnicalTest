import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MAIN_ROUTES } from './main.routes';
import { HttpClientModule } from '@angular/common/http';
import { SubscribersComponent } from './subscribers/subscribers.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    MainComponent,
    SubscribersComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(MAIN_ROUTES),
    HttpClientModule,
    FormsModule
  ]
})
export class MainModule { }
