import { OtPage } from './../ot/ot';
import { Component } from '@angular/core';
import {  NavController, NavParams,ViewController } from 'ionic-angular';
import { TaProvider } from '../../providers/ta/ta';
import { OtstatusPage } from "../otstatus/otstatus";
import { AlertController } from 'ionic-angular';
import { Events } from 'ionic-angular'

@Component({
  selector: 'page-otdetail',
  templateUrl: 'otdetail.html',
})
export class OtdetailPage {

  detailOt:any;
  datas:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl: ViewController,public taservice : TaProvider,
    public events:Events,public alertCtrl: AlertController) {
    this.detailOt = this.navParams.data;
    console.log("Detail Data : " +this.detailOt);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OtdetailPage');
  }

  cancel_ot(data:any){
    console.log('CALL API TO CANCLE LEAVE');
    console.log(this.detailOt);
    console.log(data);
  	this.taservice.cancel_ot_request(data).subscribe(
  			(resData)=>{
  				this.datas = resData;
          console.log("Response Data:"+JSON.stringify(resData));
          this.events.publish('reloadOT');
                this.navCtrl.popTo(OtPage);
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
            this.cancel_ot(this.detailOt);
            // this.navCtrl.popTo(OtstatusPage);
          }
        }
      ]
    });
    confirm.present();
  }


}
