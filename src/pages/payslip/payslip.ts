import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { DatePipe } from '@angular/common';
import { TaProvider } from '../../providers/ta/ta';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { AlertController } from 'ionic-angular';
import { AuthPage } from "../auth/auth";
import { LoadingController } from 'ionic-angular';
import { DatePickerProvider } from 'ionic2-date-picker';
import { CalendarComponentOptions,CalendarModal,CalendarModalOptions ,CalendarResult} from 'ion2-calendar'
@Component({
  selector: 'page-payslip',
  templateUrl: 'payslip.html'
})
export class PayslipPage {

  MOBI_SEQE:any = localStorage.getItem('mobi_seqe');
  tname:any = localStorage.getItem('tname')
  email:any = localStorage.getItem('email');
  payr_grop:any = localStorage.getItem('payr_grop');
  


  public localDate: Date = new Date();
  public initDate: Date = new Date();
  public maxDate: Date = new Date();
  public minDate: Date = new Date(new Date().setDate(new Date().getDate() - 90));

  datas:any;
  date_disp:any="เลือกวันที่";
  result:any;
  message:any;
  e:any=0;
  d:any=0;
  explain_e:boolean=false;
  explain_d:boolean=false;
  imgAvatar:any = localStorage.getItem('avatar');

  period:any;
  public cdate:boolean=false;
  public cdata:boolean=false;

  constructor(public modalCtrl: ModalController,public navCtrl: NavController,
    public datepipe: DatePipe,public taservice : TaProvider,
    public alertCtrl:AlertController,public loadingCtrl: LoadingController,
    private datePickerProvider: DatePickerProvider) {
    // this.presentModal();
  }


  presentModal() {
    
    let modal  = this.modalCtrl.create(AuthPage);
    modal .present();
  }

  random(){
    return Math.random();
  }

  request_payslip(){
    console.log(this.cdate);
    if (this.period != null) {
      this.cdate = true;
    }else{
      console.log(this.period);
    }

    console.log(this.cdate);
    // this.cdate = !this.cdate;
    let loader = this.loadingCtrl.create({
      content: "กำลังทำรายการ...",
      // duration: 1000
    });
    loader.present();
    // this.presentLoading();
    console.log(this.datepipe.transform(this.period, 'yyyyMMdd'));
    this.period = this.datepipe.transform(this.period, 'ddMMMMyyyy')
    this.taservice.request_payslip(this.datepipe.transform(this.period, 'yyyyMMdd')).subscribe(
      (resData)=>{
        loader.dismiss();
        this.datas = resData;
        console.log('RESDATA:'+resData);
        console.log('JSON:'+JSON.stringify(this.datas));
        if ( resData =="-1") {
          this.cdata=false;
          console.log('CDATA='+this.cdata);
          this.alertdatanull();
          this.e = 0;
          this.d = 0;
        }else{
          this.e = 0;
          this.d = 0;
          this.cdata=true;
          console.log('CDATA='+this.cdata);
          
    for (let entry of resData) {
      if (entry.type == "E") {
        this.e += parseFloat(entry.amount);
      }else if(entry.type == "D"){
        this.d += parseFloat(entry.amount);
      }
      console.log("E="+this.e); 
      console.log("D="+this.d); 
  }}
      },
      (errData)=>{
        loader.dismiss();
        console.log("Error Data:"+JSON.stringify(errData));
      }	
    );
  }

  alertdatanull() {
    let alert = this.alertCtrl.create({
      title: 'ไม่พบข้อมูล!',
      subTitle: 'ไม่พบข้อมูลในวันที่คุณเลือก',
      buttons: ['OK']
    });

    alert.present();
  }

  func_explain_e(){
    this.explain_e = !this.explain_e;
    
  }

  func_explain_d(){
    this.explain_d = !this.explain_d;
    
  }
  showCalendar() {
    const dateSelected = 
      this.datePickerProvider.showCalendar(this.modalCtrl);

    dateSelected.subscribe((date) =>{
      this.period = date;
      console.log(date);
      this.request_payslip();
    } );
    // this.request_payslip();
  }

  openCalendar() {
    const options: CalendarModalOptions = {
      //disableWeeks: [0, 100],
      disableWeeks:[],
      // pickMode: 'range',
      monthFormat: 'เดือน MM ปี YYYY',
      weekdays: ['จันทร์ ', 'อังคาร', 'พุธ', 'พฤหัสบดี', 'ศุกร์', 'เสาร์', 'อาทิตย์'],
      //weekStart: 1,
     defaultDate: new Date(),
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
      this.period = this.datepipe.transform(date.dateObj, 'yyyyMMdd')
      // this.insertData.otim_date = this.datepipe.transform(date.dateObj, 'yyyyMMdd')
       this.date_disp = date.dateObj.toLocaleDateString("th-TH");
       this.request_payslip();
      }
    });
}

}
