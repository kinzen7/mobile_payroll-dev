import { Component,ViewChild } from '@angular/core';
import {  NavController, NavParams, ModalController, ViewController, App  } from 'ionic-angular';
import { Nav, Platform,Config, Menu, MenuController,Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AlertController } from 'ionic-angular';// ใช้กับ Alert 
import { Subscription } from 'rxjs/Subscription';
import { AndroidFingerprintAuth } from '@ionic-native/android-fingerprint-auth';
import { AddleavePage } from '../addleave/addleave';
import { OtrequestPage } from '../otrequest/otrequest';
import { ServiceRecordPage } from '../service-record/service-record';
import { DetailsClokinoutPage } from '../details-clokinout/details-clokinout';


@Component({
  selector: 'page-menutwo',
  templateUrl: 'menutwo.html',
})
export class MenutwoPage {
  public time: any = 0;
  public theTime: any = 0;
  tname:any;
  position:any;
  emp_seqe:any;
 
 /* pages_addleve: Array<{ title: string, component: any }>;
  pages_otrequest: Array<{ title: string, component: any }>;
  pages_serviceRecord: Array<{ title: string, component: any }>;
  pages_detailsclokinout:  Array<{ title: string, component: any }>;
*/
  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public aFA:AndroidFingerprintAuth,
              public modalCtrl: ModalController,
              public viewCtrl: ViewController,) {
     /*เวลา*/
     let aDate = new Date();
     this.time = new Date().toISOString();
     this.theTime = new Date().toLocaleTimeString();

      /**user_information**/
      this.tname = localStorage.getItem('tname');
      this.position = localStorage.getItem('position');
      this.emp_seqe = localStorage.getItem('emp_seqe');
   
    /*เมนู
    this.pages_addleve = [
      { title: 'บันทึกการลา', component: AddleavePage }
    ];
    this.pages_otrequest = [
      { title: 'OT Requrest', component: OtrequestPage }
    ];
    this.pages_detailsclokinout = [
      { title: 'รายละเอียดการลงเวลางาน', component: DetailsClokinoutPage }
    ];*/
  }

/*
  openPage(page) {    
    this.navCtrl.setRoot(page.component);
  }
*/

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenutwoPage');
  }

  open_dt(){
    let modal = this.modalCtrl.create(DetailsClokinoutPage);
    modal.present();
  }

  fingerauth(){
    this.aFA.isAvailable()
  .then((result)=> {
    if(result.isAvailable){
      // it is available

      this.aFA.encrypt({ clientId: 'myAppName', username: 'myUsername', password: 'myPassword' })
        .then(result => {
           if (result.withFingerprint) {
              // console.log('Successfully encrypted credentials.');
              // console.log('Encrypted credentials: ' + result.token);
              this.navCtrl.setRoot(AddleavePage);
           } else if (result.withBackup) {
             console.log('Successfully authenticated with backup password!');
           } else console.log('Didn\'t authenticate!');
        })
        .catch(error => {
           if (error === this.aFA.ERRORS.FINGERPRINT_CANCELLED) {
             console.log('Fingerprint authentication cancelled');
           } else console.error(error)
        });

    } else {
      // fingerprint auth isn't available
    }
  })
  .catch(error => console.error(error));
  }

}
