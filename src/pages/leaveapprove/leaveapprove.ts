import { LeavePage } from './../leave/leave';
import { Component } from '@angular/core';
import {  NavController, NavParams,ViewController } from 'ionic-angular';
import { TaProvider } from '../../providers/ta/ta';
import { Subscription } from 'rxjs/Subscription';
import { AlertController } from 'ionic-angular';
import { ListstatusPage } from '../liststatus/liststatus';
import { Events } from 'ionic-angular'
import { LoadingController } from 'ionic-angular';
/**
 * Generated class for the LeaveapprovePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-leaveapprove',
  templateUrl: 'leaveapprove.html',
})
export class LeaveapprovePage {

   
  detailData:any;
  datas:any;
  

  constructor(public navCtrl: NavController,public events:Events,public loadingCtrl: LoadingController, public navParams: NavParams,public viewCtrl: ViewController,public taservice : TaProvider,public alertCtrl: AlertController) {
    this.detailData = this.navParams.data;
    console.log("Detail Data : " +this.detailData);
    this.detailData.APPV_NOTE = '';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListdetailPage');
  }
  reject_leave(data:any){
    this.detailData.APPV_FLAG = 'N';
    console.log(this.detailData);
    let loader = this.loadingCtrl.create({
      content: "กำลังปฏิเสธคำขอ...",
      // duration: 1000
    });
    loader.present();
    console.log("call reject_leave api");
    // loader.dismiss();
    this.taservice.approve_leave_request(this.detailData).subscribe(
      (resData)=>{
        loader.dismiss();
        this.datas = resData;
        this.events.publish('reloadDetails');
        this.navCtrl.pop();////BUG
        console.log("Response Data:"+JSON.stringify(resData));
      },
      (errData)=>{
        console.log("Error Data:"+JSON.stringify(errData));
      }	
    );
  }  

  approve_leave(data:any){
    this.detailData.APPV_FLAG = 'Y';
    console.log(this.detailData);
    let loader = this.loadingCtrl.create({
      content: "กำลังอนุมัติคำขอ...",
      // duration: 1000
    });
    loader.present();
    console.log("call approve_leave api");
    loader.dismiss();
  	this.taservice.approve_leave_request(this.detailData).subscribe(
  			(resData)=>{
          loader.dismiss();
          this.datas = resData;
          this.events.publish('reloadDetails');
          this.navCtrl.popTo(ListstatusPage);////BUG
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
      title: 'อนุมัติการลา',
      message: 'คุณแน่ใจว่าต้องการอนุมัติคำร้องนี้ใช่หรือไม่?',
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
            this.approve_leave(this.detailData);
          }
        }
      ]
    });
    confirm.present();
  }

  showConfirm2() {
    let confirm = this.alertCtrl.create({
      title: 'ปฏิเสธการลา',
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
            this.reject_leave(this.detailData);
          }
        }
      ]
    });
    confirm.present();
  }

}
