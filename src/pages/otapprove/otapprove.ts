import { OtPage } from './../ot/ot';
import { Component } from '@angular/core';
import {  NavController, NavParams,ViewController } from 'ionic-angular';
import { TaProvider } from '../../providers/ta/ta';
import { OtstatusPage } from "../otstatus/otstatus";
import { AlertController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { Events } from 'ionic-angular'
/**
 * Generated class for the OtapprovePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-otapprove',
  templateUrl: 'otapprove.html',
})
export class OtapprovePage {

  detailOt:any;
  datas:any;

  constructor(public navCtrl: NavController,public events:Events,
    public loadingCtrl: LoadingController, public navParams: NavParams,public viewCtrl: ViewController,public taservice : TaProvider,public alertCtrl: AlertController) {
    this.detailOt = this.navParams.data;
    console.log("Detail Data : " +this.detailOt);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OtdetailPage');
    this.detailOt.APPV_NOTE = '';
  }

  reject_ot(data:any){
    console.log(this.detailOt);
    let loader = this.loadingCtrl.create({
      content: "กำลังปฏิเสธคำขอ...",
      // duration: 1000
    });
    loader.present();
    console.log('call api reject ot');
    this.detailOt.OTIM_HOUR = '';
    this.detailOt.OTIM_AMNT = '';
    this.detailOt.APPV_FLAG = 'N';
    // loader.dismiss();
  	this.taservice.approve_ot_request(this.detailOt).subscribe(
  			(resData)=>{
          loader.dismiss();
          this.datas = resData;          
          this.events.publish('reloadOT');
          this.navCtrl.pop();////BUG
  				console.log("Response Data:"+JSON.stringify(resData));
  			},
  			(errData)=>{
  				console.log("Error Data:"+JSON.stringify(errData));
  			}	
  		);
  }  

  dismiss() {
    this.viewCtrl.dismiss();
  }
  
  showConfirm() {
    let confirm = this.alertCtrl.create({
      title: 'ปฏิเสธคำร้อง OT !',
      message: 'คุณแน่ใจว่าต้องการปฏิเสธคำร้องนี้ใช่หรือไม่?',
      buttons: [
        {
          text: 'ยกเลิก',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'ตกลง',
          handler: () => {
            console.log('Agree clicked');
            this.reject_ot(this.detailOt);
          }
        }
      ]
    });
    confirm.present();
  }

  presentPrompt(input:any) {
    let alert = this.alertCtrl.create({
      title: 'ชั่วโมงที่อนุมัติ',
      message: 'โปรดระบุจำนวนชั่วโมงที่อนุมัติ',
      inputs: [
        {
          name: 'hour',
          type: 'number',
          // min: 0.5,
          // max: this.detailOt.REQU_HOUR,
          // value: this.detailOt.REQU_HOUR
        },
      //   // {
      //   //   name: 'password',
      //   //   placeholder: 'Password',
      //   //   type: 'password'
      //   // }
      ],
      buttons: [
        {
          text: 'ยกเลิก',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'ตกลง',
          handler: data => {
            if(data.hour){
              console.log('User put hour');
            this.detailOt.OTIM_HOUR = data.hour;
          }else {
            console.log('User not put hour');
            this.detailOt.OTIM_HOUR = this.detailOt.REQU_HOUR;
          }
          this.detailOt.OTIM_AMNT = this.detailOt.OTIM_HOUR * 200;
          this.detailOt.APPV_FLAG = 'Y';
            console.log('this input data='+JSON.stringify(input));
            let loader = this.loadingCtrl.create({
              content: "กำลังอนุมัติคำขอ...",
              // duration: 1000
            });
            loader.present();
            console.log('call api approve ot');
            // this.detailOt.OTIM_HOUR = this.detailOt.REQU_HOUR;
            // this.detailOt.OTIM_AMNT = this.detailOt.REQU_AMNT;
            // this.detailOt.APPV_FLAG = 'Y';
            // console.log('this input data='+JSON.stringify(this.detailOt));
            // loader.dismiss();
            this.taservice.approve_ot_request(input).subscribe(
              (resData)=>{
                loader.dismiss();
                this.events.publish('reloadDetails');
                this.navCtrl.popTo(OtstatusPage);////BUG
                // this.datas = resData;
                console.log("Response Data:"+JSON.stringify(resData));
                // this.view_request();
              },
              (errData)=>{
                console.log("Error Data:"+JSON.stringify(errData));
              }	
            );
          }
        }
      ]
    });
    alert.present();
  }
}
