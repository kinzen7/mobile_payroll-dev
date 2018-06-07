import { Component } from '@angular/core';
import {  NavController, NavParams, Platform, ViewController,ModalController } from 'ionic-angular';
import { App, MenuController  } from 'ionic-angular';
import { TaProvider } from '../../providers/ta/ta';
import { Subscription } from 'rxjs/Subscription';

import { OtdetailPage } from '../otdetail/otdetail';



@Component({
  selector: 'page-otstatus',
  templateUrl: 'otstatus.html',
})
export class OtstatusPage {

  datas: any;
  inputData:any = localStorage.getItem('user'); /// สำหรับเก็บข้อมูลแบบ Object

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public taservice : TaProvider,
              public viewCtrl: ViewController,
              public modalCtrl: ModalController) {
  }

  closemodal() {
    this.viewCtrl.dismiss();    
    // this.app.getRootNav().popToRoot();
  }

  ionViewDidLoad() {    
    console.log('Local Storage: '+localStorage.getItem('user'));
    console.log('Input Object: '+this.inputData);
    // setInterval(() => {
      // this.userview_OT_Status(this.inputData);
    // }, 1000);
  }
  
  // userview_OT_Status(data:any){
	// 	console.log(this.inputData);
  // 	this.taservice.userview_OT_Status(this.inputData).subscribe(
  // 			(resData)=>{
  // 				this.datas = resData;
  // 				console.log("Response Data:"+JSON.stringify(resData));
  // 			},
  // 			(errData)=>{
  // 				console.log("Error Data:"+JSON.stringify(errData));
  // 			}	
  // 		);
  // }

  clickItem(selectItem:any){
    console.log("Select Item :"+JSON.stringify(selectItem));
    let modal = this.modalCtrl.create(OtdetailPage,selectItem);
    modal.present();
    // this.navCtrl.push(OtdetailPage,selectItem);
    //push(OtdetailPage,selectItem); เปลี่ยนหน้าไปหน้า ListdetailPage พร้อมกับส่งพารามิเตอร์ selectItem ของตัวนั้นๆไปด้วย
  }


  
}
