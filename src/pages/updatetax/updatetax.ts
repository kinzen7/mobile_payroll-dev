import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import { ProfilePage } from '../profile/profile';
/**
 * Generated class for the UpdatetaxPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-updatetax',
  templateUrl: 'updatetax.html',
})
export class UpdatetaxPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  public buttonClicked: boolean = false;
  public button2Clicked: boolean = false;

count:number=0;
  ionViewDidLoad() {
    console.log('ionViewDidLoad UpdatetaxPage');
  }
  onButtonClick(){

    this.buttonClicked = !this.buttonClicked;
    this.count += 1;
    console.log(this.count);
    
  }
  onButton2Click(){

    this.button2Clicked = !this.button2Clicked;
    
  }
  dismiss() {
    this.navCtrl.setRoot(ProfilePage);
  }
}
