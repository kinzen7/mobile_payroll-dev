import { Component } from '@angular/core';
import {  NavController, NavParams, Platform, ViewController, ModalController } from 'ionic-angular';
import { App, MenuController  } from 'ionic-angular';
import { TaProvider } from '../../providers/ta/ta';
import { Subscription } from 'rxjs/Subscription';

import { ListdetailPage } from '../listdetail/listdetail';




@Component({
  selector: 'page-liststatus',
  templateUrl: 'liststatus.html',
})
export class ListstatusPage {

  datas: any = 0; // = 0 for spinner
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
      this.userviewStatus(this.inputData);
    // }, 1000);
  }

  userviewStatus(data:any){
    console.log(this.inputData);
    console.log('CALL API TO LIST STATUS USER REQUEST')
    // setTimeout(() => {
      // this.taservice.userviewStatus(this.inputData).subscribe(
      //     (resData)=>{
      //       this.datas = resData;
      //       console.log("Response Data:"+JSON.stringify(resData));
      //     },
      //     (errData)=>{
      //       console.log("Error Data:"+JSON.stringify(errData));
      //     }	
      //   ) 
  }

  clickItem(selectItem:any){
    console.log("Select Item :"+JSON.stringify(selectItem));
    // this.navCtrl.push(ListdetailPage,selectItem);
    let modal = this.modalCtrl.create(ListdetailPage,selectItem);
    modal.present();
    //push(ListdetailPage,selectItem); เปลี่ยนหน้าไปหน้า ListdetailPage พร้อมกับส่งพารามิเตอร์ selectItem ของตัวนั้นๆไปด้วย
  }

}
