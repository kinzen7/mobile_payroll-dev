import { Component } from '@angular/core';
import {  NavController, NavParams, Platform, ViewController, ModalController } from 'ionic-angular';

/**
 * Generated class for the DetailsClokinoutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-details-clokinout',
  templateUrl: 'details-clokinout.html',
})
export class DetailsClokinoutPage {


  menu: string = "customer";

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public modalCtrl: ModalController,
              public viewCtrl: ViewController,
) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailsClokinoutPage');
  }
    closemodal() {
    this.viewCtrl.dismiss();        
  }

}

