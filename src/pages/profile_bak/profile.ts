import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DatePipe } from '@angular/common';
import { TaProvider } from '../../providers/ta/ta';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { AlertController } from 'ionic-angular';
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {

  datas:any;
  period:any;
  result:any;
  message:any;
  e:any=0;
  d:any=0;

  constructor(public navCtrl: NavController,public datepipe: DatePipe,public taservice : TaProvider,public alertCtrl:AlertController) {

  }
  request_payslip(){
    console.log(this.datepipe.transform(this.period, 'yyyyMM'));
    this.taservice.request_payslip(this.datepipe.transform(this.period, 'yyyyMM')).subscribe(
      (resData)=>{
        this.datas = resData;
        console.log(JSON.stringify(this.datas));
        if ( resData =="1") {
          this.alertdatanull();
          this.e = 0;
          this.d = 0;
        }else{

    for (let entry of resData) {
      if (entry.type == "E") {
        this.e += parseInt(entry.amount);
      }else if(entry.type == "D"){
        this.d += parseInt(entry.amount);
      }
      console.log("E="+this.e); 
      console.log("D="+this.d); 
  }}
      },
      (errData)=>{
        console.log("Error Data:"+JSON.stringify(errData));
      }	
    );
  }

  alertdatanull() {
    let alert = this.alertCtrl.create({
      title: 'ไม่พบข้อมูล!',
      subTitle: 'ไม่พบข้อมูลในงวดที่คุณเลือก',
      buttons: ['OK']
    });

    alert.present();
  }

}
