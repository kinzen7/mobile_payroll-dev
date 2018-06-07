import { Component } from '@angular/core';
import {  NavController, NavParams, ViewController,ModalController } from 'ionic-angular';
import { TaProvider } from '../../providers/ta/ta';
import { Subscription } from 'rxjs/Subscription';
import { AlertController } from 'ionic-angular';
import { OtstatusPage } from '../otstatus/otstatus';


@Component({
  selector: 'page-otrequest',
  templateUrl: 'otrequest.html',
})
export class OtrequestPage {

  button=true;
  startdate:any;
  enddate:any;
  seconds:any;
  datas:any;
  insertData:any={};
  day:any = 0;
  hour:any = 0;
  minute:any = 0;
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public taservice : TaProvider,
              public alertCtrl: AlertController,
              public viewCtrl: ViewController,
              public modalCtrl: ModalController,) 
  {
    this.getPosition();

    let aDate = new Date();
    aDate.setHours(aDate.getHours() - (aDate.getTimezoneOffset()/60));
    this.insertData.startdate = aDate.toISOString();
    this.insertData.enddate = aDate.toISOString(); 
  }

  closemodal() {
    this.viewCtrl.dismiss();    
    // this.app.getRootNav().popToRoot();
  }

  getPosition(){
    navigator.geolocation.getCurrentPosition((resp)=>{
      this.insertData.lat=resp.coords.latitude;
      this.insertData.lng=resp.coords.longitude;
      },(error)=>{
        console.log("GEOLOCATION Error:"+JSON.stringify(error));
      },{ timeout: 2000, enableHighAccuracy: true })
      
  }

  showAlert() {
    let alert = this.alertCtrl.create({
      title: 'ข้อมูลไม่ถูกต้อง!',
      subTitle: 'กรุณาตรวจสอบวันที่อีกครั้งก่อนทำรายการ!',
      buttons: ['OK']
    });
    alert.present();
  }
  showConfirm() {
    let confirm = this.alertCtrl.create({
      title: 'ยืนยันการทำรายการ?',
      message: 'คุณแน่ใจว่าต้องการส่งคำร้องนี้ใช่หรือไม่?',
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
            // this.request_ot(this.insertData);
            console.log('Agree clicked');
          }
        }
      ]
    });
    confirm.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OtrequestPage');
  }
  // request_ot(data:any){
  //   console.log(this.insertData);
  // 	this.taservice.request_ot(this.insertData).subscribe(
  // 			(resData)=>{
  // 				this.datas = resData;
  //         console.log("Response Data:"+JSON.stringify(resData));
  //         this.insertData = {type:null,startdate:null,enddate:null};
  //         this.day = 0;
  //         this.hour = 0;
  //         this.minute = 0;
  //         // this.navCtrl.push(OtstatusPage);
  //         let modal = this.modalCtrl.create(OtstatusPage);
  //         modal.present();
  //         this.button = true;
  // 			},
  // 			(errData)=>{
  // 				console.log("Error Data:"+JSON.stringify(errData));
  // 			}	
  // 		);
  // }  
  public checkdate(){
    this.startdate = Date.parse(this.insertData.startdate) /1000;
    this.enddate = Date.parse(this.insertData.enddate) /1000;
    // this.starttime = parseInt(this.insertData.starttime);
    // this.endtime = parseInt(this.insertData.endtime);


    console.log(this.startdate+' '+this.enddate);

    if (this.enddate > this.startdate) {
      console.log("ถูกต้อง");
      console.log((this.enddate - this.startdate));
      this.seconds=(this.enddate - this.startdate);
      this.day = (this.seconds / 86400);
      this.hour = ((this.seconds % 86400) / 3600);
      this.minute =  ((this.seconds % 3600) / 60);
      this.day = parseInt(this.day);
      this.hour = parseInt(this.hour);
      this.minute = parseInt(this.minute);
      this.button = false;
    } else {
      if(this.startdate && this.enddate)
      {
        this.button = true;
        this.showAlert();
      }
      this.day = 0;
      this.hour = 0;
      this.minute = 0;
    } 
    
  }

  public checkfromdate() {
    this.startdate = Date.parse(this.insertData.startdate) / 1000;
    this.enddate = Date.parse(this.insertData.enddate) / 1000;
    
        if (this.startdate > this.enddate || this.insertData.enddate === undefined) {
          console.log('start > end');
          this.insertData.enddate = this.insertData.startdate;
          this.day = 0;
          this.hour = 0;
          this.minute = 0;
          this.button = true;
        } else{
          console.log("ELSE: "+this.insertData.enddate);
          this.checkdate();
        }
        
      }
}
