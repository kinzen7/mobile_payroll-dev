import { Component } from '@angular/core';
import { NavController, NavParams,ModalController } from 'ionic-angular';
import { Device } from '@ionic-native/device';
import { AlertController } from 'ionic-angular';
import { TaProvider } from '../../providers/ta/ta';
import { OneSignal } from '@ionic-native/onesignal';

import { LoginPage } from "../login/login";

@Component({
  selector: 'page-registartion',
  templateUrl: 'registartion.html',
})
export class RegistartionPage {

  uuid:any;
  insertData: any = {};
  datas: any;
  play_id:any;
  result:any;
  takenid:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,private device: Device,public alertCtrl: AlertController,private oneSignal: OneSignal,
              public taservice: TaProvider,public modalCtrl: ModalController) {

//    this.uuid = this.device.uuid;
//   this.oneSignal.getIds().then((data) => {
//     this.play_id = data.userId;
//     localStorage.setItem('play_id',data.userId);
//  });
                this.takenid = navParams.get('takenid');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistartionPage');
    // this.insertData.mobi_token="51556850553151366458526F59573168644542684C5768766333517559323875644767364D6A41784F4330774E5330794D4377784F4330774D4330794E513D3D";
    // localStorage.setItem('com_seqe','test');
    // if (localStorage.getItem('play_id') === null) {
    //   this.navCtrl.setRoot(this.navCtrl.getActive().component);
    //  }
  }

  showAlert() {
    let alert = this.alertCtrl.create({
      title: 'ข้อมูลไม่ถูกต้อง!',
      subTitle: 'กรุณาตรวจสอบวันที่อีกครั้งก่อนทำรายการ!',
      buttons: ['ตกลง']
    });
    alert.present();
  }

  showConfirm() {
    let confirm = this.alertCtrl.create({
      title: 'ยืนยันการลงทะเบียนอุปกรณ์',
      message: 'คุณแน่ใจว่าต้องการลงทะเบียนอุปกรณ์นี้ใช่หรือไม่?',
      buttons: [
        {
          text: 'ไม่ใช่',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'ใช่',
          handler: () => {
            console.log('Agree clicked');
            this.check_token(this.insertData);
          }
        }
      ]
    });
    confirm.present();
  }

  register(data: any) {
    console.log(this.insertData);
    this.taservice.register(this.insertData).subscribe(
      (resData) => {
        console.log("RES DATA:"+resData);
        this.result = resData._body.split(",",3)
        console.log("result:"+this.result);
        if (this.result[0] == "0") {
          localStorage.setItem('mobi_seqe',this.result[1]);
          localStorage.setItem('token',this.result[2]);
          localStorage.setItem('email',this.insertData.empl_emai);
          this.regi_success();
        }else if(this.result[0] == "99"){
          this.regi_already();
        }
        else {this.regi_error();}
        console.log("Response Data:" +  this.result);
      },
      (errData) => {
        console.log("Error Data:" + JSON.stringify(errData));
      }
    );
  }
////////////////////////////
  regi_error() {
    let alert = this.alertCtrl.create({
      title: 'ข้อมูลไม่ถูกต้อง',
      subTitle: 'กรุณาตรวจสอบข้อมูลอีกครั้ง',
      buttons: ['ตกลง']
    });

    alert.present();
  }
////////////////////////
  regi_success() {
    let alert = this.alertCtrl.create({
      title: 'ลงทะเบียนสำเร็จ',
      subTitle: 'กรุณารอการตรวจสอบข้อมูลก่อนเริ่มใช้งาน',
      buttons: [{
        text: 'ตกลง',
        role: 'ตกลง',
        handler: () => {
          console.log('Go to login page.');
          this.navCtrl.setRoot(LoginPage, {
          }, {animate:false});
        }
      }
    ]
    });

    alert.present();
  }
  ////////////////////////////////////

  regi_already() {
    let alert = this.alertCtrl.create({
      title: 'โปรดตรวจสอบข้อมูล!',
      subTitle: 'อีเมลล์นี้ได้ลงทะเบียนกับอุปกรณ์อื่นแล้ว',
      buttons: ['ตกลง']
    });

    alert.present();
  }



  check_token(data: any) {
    console.log(this.insertData);
    this.taservice.check_token(this.insertData).subscribe(
      (resData) => {
        if (resData.CODE == 0) {
          
          localStorage.setItem('CUST_ACCO',resData.CUST_ACCO);
          localStorage.setItem('register',"0");
          localStorage.setItem('email',this.insertData.empl_emai);
          this.regi_success();
        }else{
          this.regi_error();
        }
      },
      (errData) => {
        this.regi_error();
        console.error('Check token failed!');
        console.log("Error Data:" + JSON.stringify(errData));
      }
    );
  }
////////////////////////////

}
