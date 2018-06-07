import { LeavePage } from './../leave/leave';
import { Component } from '@angular/core';
import {  NavController, NavParams,ViewController } from 'ionic-angular';
import { TaProvider } from '../../providers/ta/ta';
import { Subscription } from 'rxjs/Subscription';
import { AlertController } from 'ionic-angular';
import { ListstatusPage } from '../liststatus/liststatus';
import { Events } from 'ionic-angular'


@Component({
  selector: 'page-listdetail',
  templateUrl: 'listdetail.html',
})
export class ListdetailPage {
  
  detailData:any;
  datas:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl: ViewController,public taservice : TaProvider,public alertCtrl: AlertController,
    public events:Events)
    
    {
    this.detailData = this.navParams.data;
    console.log("Detail Data : " +this.detailData);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListdetailPage');
  }
  cancel_leave(data:any){
    console.log('CALL API TO CANCLE LEAVE');
    console.log(this.detailData);
    console.log(data);
  	this.taservice.cancel_leave_request(data).subscribe(
  			(resData)=>{
  				this.datas = resData;
          console.log("Response Data:"+JSON.stringify(resData));
          this.events.publish('reloadDetails');
                this.navCtrl.popTo(LeavePage);
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
      title: 'ยกเลิกข้อมูลการลา',
      message: 'คุณแน่ใจว่าต้องการยกเลิกคำร้องนี้ใช่หรือไม่?',
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
            console.log(this.detailData);
            this.cancel_leave(this.detailData);
            // this.navCtrl.popTo(ListstatusPage);
          }
        }
      ]
    });
    confirm.present();
  }
}
