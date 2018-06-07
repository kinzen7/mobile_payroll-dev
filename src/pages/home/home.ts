import { MapPage } from './../map/map';
import { Component } from '@angular/core';
import { NavController,Events } from 'ionic-angular';
import { ProfilePage } from "../profile/profile";
import { OtPage } from "../ot/ot";
import { LeavePage } from "../leave/leave";
import { ServiceRecordPage } from "../service-record/service-record";
import { PayslipPage } from "../payslip/payslip";
import { AuthPage } from "../auth/auth";
import { TaProvider } from '../../providers/ta/ta';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  tname:any;
  payr_grop:any;
  MOBI_SEQE:any;
  email:any;
  imgAvatar:any = localStorage.getItem('avatar');
  constructor(public navCtrl: NavController,public events: Events,
    public taservice : TaProvider,) {

    this.events.subscribe('login', (res: any) => {
      console.log("Login Data[home.ts]:" + JSON.stringify(res));
      this.tname = res[0].TFST_NAME+' '+res[0].TLST_NAME;
      this.payr_grop = res[0].PAYR_GROP;
    });


  }
  random(){
    return Math.random();
  }

  ionViewDidLoad() {
    
  this.MOBI_SEQE = localStorage.getItem('mobi_seqe');
  this.tname = localStorage.getItem('tname');
  this.email = localStorage.getItem('email');
  this.payr_grop = localStorage.getItem('payr_grop');
    console.log('ionViewDidLoad Home');



      }


  open_ta(){
    this.navCtrl.setRoot(MapPage, {
    }, {animate:false});
  }

  open_profile(){
    this.navCtrl.setRoot(ProfilePage, {
    }, {animate:false});
  }

  open_ot(){
    this.navCtrl.setRoot(OtPage, {
    }, {animate:false});
  }

  open_leave(){
    this.navCtrl.setRoot(LeavePage, {
    }, {animate:false});
  }

  open_payslip(){
    this.navCtrl.setRoot(AuthPage, {
    }, {animate:false});
  }

  open_service(){
    this.navCtrl.setRoot(ServiceRecordPage, {
    }, {animate:false});
  }


}
