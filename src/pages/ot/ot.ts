import { Component } from '@angular/core';
import {  NavController, NavParams,ModalController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { DatePickerProvider } from 'ionic2-date-picker';
import { TaProvider } from '../../providers/ta/ta';
import { LoadingController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { OtdetailPage } from "../otdetail/otdetail";
import { OtapprovePage } from "../otapprove/otapprove";
import { Events } from 'ionic-angular'
import { CalendarComponentOptions,CalendarModal,CalendarModalOptions ,CalendarResult} from 'ion2-calendar'
import { DatePipe } from '@angular/common';
/**
 * Generated class for the OtPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-ot',
  templateUrl: 'ot.html',
})
export class OtPage {

  datas_approved:any;
  datas_waiting:any;
  datas_reject:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,private alertCtrl: AlertController,
    public datepipe: DatePipe,
    public taservice : TaProvider,
    private datePickerProvider: DatePickerProvider,public modalCtrl:ModalController,
    public loadingCtrl: LoadingController,public events:Events) {
    this.check_grop();
    this.listenEvents();
  }
  public menu:any='request';
  public isManagement:boolean=false;
  public localDate: Date = new Date();
  public initDate: Date = new Date();
  public maxDate: Date = new Date(new Date().setDate(new Date().getDate() + 30));
  public minDate: Date = new Date(new Date().setDate(new Date().getDate() - 30));
  // date:any='เลือกวันที่';
  public insertData:any={};
  datas:any;
  reqe_datas:any;
  otim_date_disp:any;
  
  random(){
    return Math.random();
  }

  listenEvents(){
    this.events.subscribe('reloadOT',() => {
      this.load_query();
    });
  }
  ionViewDidLoad() {
    // this.check_grop();
    console.log('ionViewDidLoad OtPage');
    // this.insertData.ot_date = 'เลือกวันที่';
    this.load_query();
    // this.insertData.ot_time = 0;
  }
  presentConfirm(data:any) {
    let alert = this.alertCtrl.create({
      title: 'ยืนยันการยกเลิก',
      message: 'คุณต้องการยกเลิกคำขอนี้ใช่หรือไม่?',
      buttons: [
        {
          text: 'ไม่',
          role: 'no',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'ใช่',
          handler: () => {
            console.log('Yes clicked');
            console.log(data);
            let loader = this.loadingCtrl.create({
              content: "กำลังยกเลิกคำขอ...",
              // duration: 1000
            });
            loader.present();
            console.log('call api cancel OT');
            loader.dismiss();
            // this.taservice.cancle_ot(data).subscribe(
            //   (resData)=>{
            //     loader.dismiss();
            //     // this.datas = resData;
            //     console.log("Response Data:"+JSON.stringify(resData));
            //     this.status(localStorage.getItem("mobi_seqe"));
            //   },
            //   (errData)=>{
            //     console.log("Error Data:"+JSON.stringify(errData));
            //   }	
            // );
          }
        }
      ]
    });
    alert.present();
  }

  public check_grop(){
    if(localStorage.getItem('mobi_role')=='M_APPROVER'){
      this.isManagement=true;
      console.log('M_APPROVER!');
    }else{this.isManagement=false;console.log('NOT M_APPROVER');}
  }

  // showCalendar() {
  //   var options = {  
  //     weekday: "long", year: "numeric", month: "long",  
  //     day: "numeric"  
  // };
  //   const dateSelected = 
  //     this.datePickerProvider.showCalendar(this.modalCtrl);

  //   dateSelected.subscribe(date => 
  //     this.insertData.otim_date = this.datepipe.transform(date, 'yyyyMMdd')
  //   );

  //   console.log(this.insertData.otim_date);
  // }
  clickItem(selectItem:any){
    console.log("Select Item :"+JSON.stringify(selectItem));
    let modal = this.modalCtrl.create(OtdetailPage,selectItem);
    modal.present();
    // this.navCtrl.push(OtdetailPage,selectItem);
    //push(OtdetailPage,selectItem); เปลี่ยนหน้าไปหน้า ListdetailPage พร้อมกับส่งพารามิเตอร์ selectItem ของตัวนั้นๆไปด้วย
  }

  ot_admin(selectItem:any){
    console.log("Select Item :"+JSON.stringify(selectItem));
    let modal = this.modalCtrl.create(OtapprovePage,selectItem);
    modal.present();
    // this.navCtrl.push(OtdetailPage,selectItem);
    //push(OtdetailPage,selectItem); เปลี่ยนหน้าไปหน้า ListdetailPage พร้อมกับส่งพารามิเตอร์ selectItem ของตัวนั้นๆไปด้วย
  }


  calc_ot_amnt(){
    // Hardcord set this.insertData.rate to 'syst'
    this.insertData.rate = 'syst';
    if(this.insertData.rate == 'syst'){
      console.log('syst')
      this.insertData.requ_amnt =  this.insertData.requ_hour*200;
    }else if(this.insertData.rate == 'manu'){
      console.log('manu');
      this.insertData.requ_amnt = '';
    }
  }

  ot_request(data:any){
    // this.calc_ot_amnt();
    let loader = this.loadingCtrl.create({
      content: "กำลังส่งคำขอ...",
      // duration: 1000
    });
    loader.present();
    console.log("Insert DATA="+ JSON.stringify(this.insertData));
    console.log('call api request ot');
    this.insertData.time_to = this.insertData.time_to.replace(":",".");
    this.insertData.time_from =  this.insertData.time_from.replace(":",".");
    this.insertData.requ_hour = this.insertData.time_to - this.insertData.time_from;
    // loader.dismiss();
  	this.taservice.request_ot_request(this.insertData).subscribe(
  			(resData)=>{
          loader.dismiss();
          console.log("Response Data:"+JSON.stringify(resData));
          this.menu = "status";
          this.insertData = {};
          this.otim_date_disp ='';
          // this.navCtrl.push(OtstatusPage);
          // let modal = this.modalCtrl.create(OtstatusPage);
          // modal.present();
  			},
  			(errData)=>{
  				console.log("Error Data:"+JSON.stringify(errData));
  			}	
  		);
  }  

  user_review_ot(status:any,format:any){ // GET OT REQUEST STATUS 1[WAIT]
    console.log("Insert DATA="+this.insertData);
    let loader = this.loadingCtrl.create({
      content: "กำลังดึงข้อมูล...",
      // duration: 1000
    });
    loader.present();
    console.log('call api user_review_ot_waiting')
    // loader.dismiss();
    
    this.insertData.ot_stat = status;
    this.insertData.ot_format = format;

  	this.taservice.user_review_ot(this.insertData).subscribe(
  			(resData)=>{
          loader.dismiss();
          if(resData != '-1')
          {
            if (status == 1 ) { // 1 = waiting
              this.datas_waiting = resData;
            } else if (status == 2){ // 2 = approved
              this.datas_approved = resData;
            } else if (status == 4) { // 4 = reject
              this.datas_reject = resData;
            }
            
          }else if(resData == '-1'){
            
            if (status == 1) { // 1 = Waiting
              this.datas_waiting = [];
            }else if (status == 2) { //2 = Approved
              this.datas_approved = [];
            } else if(status == 4){ // 4 = Reject
              this.datas_reject = [];
            }
          }
  				console.log("Response Data:"+JSON.stringify(resData));
          // this.navCtrl.push(OtstatusPage);
          // let modal = this.modalCtrl.create(OtstatusPage);
          // modal.present();
  			},
  			(errData)=>{
          if (status == 1) { // 1 = Waiting
            this.datas_waiting = [];
          }else if (status == 2) { //2 = Approved
            this.datas_approved = [];
          } else if(status == 4){ // 4 = Reject
            this.datas_reject = [];
          }
          loader.dismiss();
  				console.log("Error Data:"+JSON.stringify(errData));
  			}	
  		);
  }  

  view_request(){
    console.log("Insert DATA="+JSON.stringify(this.insertData));
    let loader = this.loadingCtrl.create({
      content: "กำลังดึงข้อมูลคำร้อง...",
      // duration: 1000
    });
    loader.present();
    console.log('call api view request ot');
    // loader.dismiss();
  	this.taservice.review_ot_request().subscribe(
  			(resData)=>{
          loader.dismiss();
          if(resData != '-1')
          {this.reqe_datas=resData;}else if(resData == '-1'){this.reqe_datas=[];}
          console.log("Response Data:"+JSON.stringify(resData));
  			},
  			(errData)=>{
          this.reqe_datas=[];
          loader.dismiss();
  				console.log("Error Data:"+JSON.stringify(errData));
  			}	
  		);
  } 

  openCalendar() {
    const options: CalendarModalOptions = {
      //disableWeeks: [0, 100],
      disableWeeks:[],
      // pickMode: 'range',
      monthFormat: 'เดือน MM ปี YYYY',
      weekdays: ['จันทร์ ', 'อังคาร', 'พุธ', 'พฤหัสบดี', 'ศุกร์', 'เสาร์', 'อาทิตย์'],
      //weekStart: 1,
    //  defaultDate: new Date(),
      title: '',
      from:this.minDate,
      to:this.maxDate,
    };

    let myCalendar = this.modalCtrl.create(CalendarModal, {
      options: options
    });

    myCalendar.present();

    // myCalendar.
    myCalendar.onDidDismiss((date: CalendarResult, type: string ) => {
      if(date){
      console.log(date.dateObj);
      this.insertData.otim_date = this.datepipe.transform(date.dateObj, 'yyyyMMdd')
      this.otim_date_disp = date.dateObj.toLocaleDateString("th-TH");
      }
    });
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
            this.ot_request(this.insertData);
            console.log('Agree clicked');
          }
        }
      ]
    });
    confirm.present();
  }

  load_query(){
    if (this.menu == "status") {
      this.user_review_ot(1,0); // W
      this.user_review_ot(2,0); // A
      this.user_review_ot(4,0); // R
      console.log("status")
    } else if (this.menu == "cancel") {
      console.log("cancel")
      // this.status(localStorage.getItem("mobi_seqe"));
    } else if (this.menu == "approve") {
      // console.log("approve")
      this.view_request();
    } else {
      // console.log("request")
    }
  }

  presentPrompt(input:any) {
    let alert = this.alertCtrl.create({
      title: 'ใส่จำนวนชั่วโมงอนุมัติ',
      inputs: [
        {
          name: 'hour',
          type: 'number'
          // placeholder: 'Username'
        },
        // {
        //   name: 'password',
        //   placeholder: 'Password',
        //   type: 'password'
        // }
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
            input.ot_appv_hour = data.hour;
            console.log('this input data='+JSON.stringify(input));
            let loader = this.loadingCtrl.create({
              content: "กำลังอนุมัติคำขอ...",
              // duration: 1000
            });
            loader.present();
            // this.taservice.approve_ot(input).subscribe(
            //   (resData)=>{
            //     loader.dismiss();
            //     // this.datas = resData;
            //     console.log("Response Data:"+JSON.stringify(resData));
            //     this.view_request();
            //   },
            //   (errData)=>{
            //     console.log("Error Data:"+JSON.stringify(errData));
            //   }	
            // );
          }
        }
      ]
    });
    alert.present();
  }
  dismiss() {
    this.navCtrl.setRoot(HomePage);
  }

  

}
