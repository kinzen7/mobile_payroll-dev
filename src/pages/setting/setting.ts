import { Component,ViewChild } from '@angular/core';
import {  NavController, NavParams, AlertController, Nav, App } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';
import { LoginPage } from '../login/login';


@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html',
})
export class SettingPage {
  // @ViewChild(Nav) nav: Nav;
  @ViewChild('content') nav: NavController;

  com_seqe:any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public alertCtrl: AlertController,
              public app: App,
              private socialSharing: SocialSharing) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingPage');
  }

  logout() {
    let alert = this.alertCtrl.create({
      title: 'ลงชื่อออก',
      message: 'คุณต้องการออกจากระบบใช่หรือไม่',
      buttons: [
        {
          text: 'ยกเลิก',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'ตกลง',
          handler: () => {
            console.log('Logged out');
            // this.com_seqe=localStorage.getItem('com_seqe');
            // localStorage.clear();
            // localStorage.setItem('com_seqe',this.com_seqe);
            this.app.getRootNav().setRoot(LoginPage);
          }
        }
      ]
    });
    alert.present();
  }

  regularShare(){
    // share(message, subject, file, url)
     this.socialSharing.share('Body', 'Subject', ['recipient@example.org']).then(() => {
      // Success!
    }).catch(() => {
      // Error!
    });
  }

  /**
   * This share's directly via twitter using the:
   * shareViaTwitter(message, image, url)
   */
  twitterShare(){
    this.socialSharing.shareViaTwitter("Testing, sharing this from inside an app I'm building right now", "www/assets/img/hulk.jpg", null); 
  }

  /**
   * This share's directly via whatsapp using the:
   * shareViaWhatsapp(message, image, url)
   */
  whatsappShare(){
    this.socialSharing.shareViaWhatsApp("Testing, sharing this from inside an app I'm building right now", "www/assets/img/hulk.jpg", null); 
  }

  /**
   * This share's directly via Instagram using:
   * shareViaInstagram(message, image)
   */
  instagramShare(){
    this.socialSharing.shareViaEmail('Body', 'Subject', ['recipient@example.org']).then(() => {
      // Success!
    }).catch(() => {
      // Error!
    });
  }

  otherShare(){
    this.socialSharing.share("Genral Share Sheet",null/*Subject*/,null/*File*/,"https://pointdeveloper.com")
    .then(()=>{
        alert("Success");
      },
      ()=>{
         alert("failed")
      })
 
  }

}
