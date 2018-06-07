import { Component } from '@angular/core';
import {  NavController, NavParams, ModalController, ViewController, App  } from 'ionic-angular';

import { AddleavePage } from '../addleave/addleave';
import { OtrequestPage } from '../otrequest/otrequest';



@Component({
  selector: 'page-menu-request',
  templateUrl: 'menu-request.html',
})
export class MenuRequestPage {


  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public modalCtrl: ModalController,
              public viewCtrl: ViewController,
              public app: App) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuRequestPage');
  }

  open_addleave(){
    // this.navCtrl.push(AddleavePage);
    let modal = this.modalCtrl.create(AddleavePage);
    modal.present();
  }

  open_ot(){
    let modal = this.modalCtrl.create(OtrequestPage);
    modal.present();
  }

}
