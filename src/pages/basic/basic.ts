import { Component } from '@angular/core';
import {  NavController, NavParams,ModalController } from 'ionic-angular';
import { DatePickerProvider } from 'ionic2-date-picker';

/**
 * Generated class for the BasicPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-basic',
  templateUrl: 'basic.html',
})
export class BasicPage {

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    private datePickerProvider: DatePickerProvider ) {
    
  }

  showCalendar() {
    const dateSelected = 
      this.datePickerProvider.showCalendar(this.modalCtrl);

    dateSelected.subscribe(date => 
      console.log("first date picker: date selected is", date));
  }

  showCalendar2() {
    const dateSelected = 
      this.datePickerProvider.showCalendar(this.modalCtrl);

    dateSelected.subscribe(date => 
      console.log("second date picker: date selected is", date));
  }

}
