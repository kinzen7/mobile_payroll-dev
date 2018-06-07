import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PayslipPage } from '../payslip/payslip';
import { ModalController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
// import { IonicPage } from 'ionic-angular/navigation/ionic-page';


@Component({
  selector: 'page-auth',
  templateUrl: 'auth.html'
})
export class AuthPage {

  input:any={};

  constructor(public navCtrl: NavController,public modalCtrl: ModalController,private alertCtrl: AlertController) {
  }


  check_pass(){
    if (this.input.pass) {
      let modal = this.modalCtrl.create(PayslipPage);
    modal.present();
      console.log('OK')
    }else{
      this.presentAlert();
      console.log("not ok")
    }
    
  }

  presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'ลองใหม่อีกครั้ง!',
      subTitle: 'รหัสยืนยันไม่ถูกต้อง.',
      buttons: ['ตกลง']
    });
    alert.present();
  }


}
