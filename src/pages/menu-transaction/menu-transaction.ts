import { Component } from '@angular/core';
import {  NavController, NavParams, ModalController, ViewController, App } from 'ionic-angular';

import { ListstatusPage } from '../liststatus/liststatus';
import { OtstatusPage } from '../otstatus/otstatus';


@Component({
  selector: 'page-menu-transaction',
  templateUrl: 'menu-transaction.html',
})
export class MenuTransactionPage {

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public modalCtrl: ModalController,
              public viewCtrl: ViewController,
              public app: App) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuTransactionPage');
  }

  open_Liststatus(){
    // this.navCtrl.push(AddleavePage);
    let modal = this.modalCtrl.create(ListstatusPage);
    modal.present();
  }

  open_otstatus(){
    let modal = this.modalCtrl.create(OtstatusPage);
    modal.present();
  }

}
