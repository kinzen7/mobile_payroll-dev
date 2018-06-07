import { Component } from '@angular/core';
import {  NavController, NavParams , MenuController ,Events} from 'ionic-angular';
import { TaProvider } from '../../providers/ta/ta';
import { Subscription } from 'rxjs/Subscription';
import { AlertController } from 'ionic-angular';
import { AndroidFingerprintAuth } from '@ionic-native/android-fingerprint-auth';
import { Device } from '@ionic-native/device';
import { DatePipe } from '@angular/common';
import { LoadingController,ToastController } from 'ionic-angular';

/*คลิกที่ปุ่ม "เข้าสู่ระบบ" => หน้าเพิ่มบันทึกการลา โดยผ่าน Function login() */
import { AddleavePage } from '../addleave/addleave';
import { MenutwoPage } from '../menutwo/menutwo';
import { TabmenuPage } from '../tabmenu/tabmenu';
import { PayslipPage } from "../payslip/payslip";
import { MapPage } from "../map/map";
import { RegistartionPage } from "../registartion/registartion";
import {TranslatePipe, TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user:any;
  userinfo:any;
  uuid:any;
  com_seqe:any;
  play_id:any;
  insertData:any={};
  input:any={};
  CUST_ACCO:any = localStorage.getItem('cust_acco');

  constructor(public events:Events,
              public navCtrl: NavController, 
              public navParams: NavParams , 
              public menu :MenuController,
              public taservice : TaProvider,
              public alertCtrl:AlertController,
              public aFA: AndroidFingerprintAuth,
              private device: Device,
              public datepipe: DatePipe,public loadingCtrl: LoadingController,
              public toastCtrl: ToastController,
              private translate: TranslateService) {

              this.uuid = localStorage.getItem('uuid');
              this.com_seqe = localStorage.getItem('com_seqe');
              this.play_id = localStorage.getItem('play_id');

  }

  ionViewDidLoad() {
     this.insertData.mobi_emai = localStorage.getItem('email');
    console.log('ionViewDidLoad LoginPage');
  }
  clear_localstorage() {
    localStorage.clear();
  }
   /* ไม่ให้ Menu โผล่มาในหน้า login */  
  ionViewDidEnter(){
    this.menu.swipeEnable(false,"menu");
  }
  /* splash ก่อนเข้าหน้า App */


  doLogin(){
    let loader = this.loadingCtrl.create({
      content: "กำลังเข้าสู่ระบบ...",
      // duration: 1000
    });
    loader.present();
    if (this.insertData.mobi_emai != null && this.insertData.mobi_auth != null) {
      this.taservice.laravel_login(this.insertData).subscribe(
        (res)=>{

          console.log("Login RES:"+JSON.stringify(res));
          console.log(res.data[0].mobi_hwid);

            localStorage.setItem('mobi_seqe',res.data[0].mobi_seqe);
            localStorage.setItem('mobi_role',res.data[0].mobi_role);
            localStorage.setItem('cust_acco',res.data[0].cust_acco);
            localStorage.setItem('cust_seqe',res.data[0].cust_seqe);
            localStorage.setItem('api_token',res.success.token);

            this.input.mobi_seqe = res.data[0].mobi_seqe;
            this.input.in_bound = this.datepipe.transform(new Date, 'yyyyMMdd');
            this.input.profile = "1";
            console.log(this.input);
            localStorage.setItem('email',this.insertData.mobi_emai);

            this.taservice.get_avatar().subscribe(
              (res_info)=>{
                localStorage.setItem('avatar_md5',res_info.md5);
                localStorage.setItem('avatar',res_info.content);
                // console.log(JSON.stringify(res_info));
                console.log(JSON.stringify(res_info.md5));
          },
          (err)=>{
            loader.dismiss();
            console.error('ERROR GET AVATAR');
          }
                  );

                this.taservice.request_user_info(this.input).subscribe(
              (res_info)=>{
                console.log('Request USER INFO: '+JSON.stringify(res_info));
                localStorage.setItem("tname",res_info[0].TFST_NAME+' '+res_info[0].TLST_NAME);
                localStorage.setItem("ename",res_info[0].EFST_NAME+' '+res_info[0].ELST_NAME);
                localStorage.setItem('payr_grop',res_info[0].PAYR_GROP);
                this.events.publish('login',res_info);
                loader.dismiss();
                this.navCtrl.setRoot(TabmenuPage, {
                    }, {animate:false});
          },
          (err)=>{
            this.presentToast('Error while get information data!');
            console.log('Get user info Error!'+JSON.stringify(err));
            loader.dismiss();
          }
                  );
              },
        (err)=>{
          loader.dismiss();
          this.presentToast('Authentication Error!');
          console.error('Authentication Error!');
        }
                );
    }else{
      loader.dismiss();
      console.log('กรอกข้อมูลหน่อยยยยยยยยยยย');
      this.alertdatanull();
      return;
    }
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'middle'
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }

  doLogin_aFa(){
    if (this.uuid != null) {
      this.userinfo = this.taservice.uuid_login(this.uuid).subscribe(
        (res)=>{
          if (res.length == 0) {
            console.log('ไม่เจอข้อมูลจ้าาาาาาาาา');
            this.uuid_notfound();
            return;
          }else {
            console.log(res.length);
            this.events.publish('login',res);
            localStorage.setItem('user',this.user);
            console.log(this.userinfo);
            localStorage.setItem('email',this.insertData.email);
            this.navCtrl.setRoot(TabmenuPage, {
            }, {animate:false});
          }
              },
        (err)=>{}
                );
    }else{
      console.log('กรอกข้อมูลหน่อยยยยยยยยยยย');
      this.alert_uuid();
      return;
    }
  }

  alertdatanull() {
    let alert = this.alertCtrl.create({
      title: 'ใส่ข้อมูลให้ครบ!',
      subTitle: 'กรุณากรอก Username และ Password',
      buttons: ['OK']
    });

    alert.present();
  }

  alert_uuid() {
    let alert = this.alertCtrl.create({
      title: 'ผิดพลาด!',
      subTitle: 'ไม่พบ UUID',
      buttons: ['OK']
    });

    alert.present();
  }

  uuid_notfound() {
    let alert = this.alertCtrl.create({
      title: 'ไม่พบผู้ใช้งาน!',
      subTitle: 'กรุณาลงทะเบียนก่อนการใช้งาน',
      buttons: ['OK']
    });

    alert.present();
  }

  alertdatawrong() {
    let alert = this.alertCtrl.create({
      title: 'ไม่พบข้อมูล!',
      subTitle: 'กรุณาตรวจสอบข้อมูลอีกครั้ง',
      buttons: ['OK']
    });

    alert.present();
  }

  alertdata_multiple() {
    let alert = this.alertCtrl.create({
      title: 'ผิดพลาด!',
      subTitle: 'พบข้อมูลมากกว่า 1 row!',
      buttons: ['OK']
    });

    alert.present();
  }

    fingerauth(){
    this.aFA.isAvailable()
  .then((result)=> {
    if(result.isAvailable){
      // it is available

      this.aFA.encrypt({ clientId: 'Payroll', disableBackup:true })
        .then(result => {
           if (result.withFingerprint) {
            this.doLogin_aFa();
              // this.navCtrl.setRoot(TabmenuPage);
           } else console.log('Didn\'t authenticate!');
        })
        .catch(error => {
           if (error === this.aFA.ERRORS.FINGERPRINT_CANCELLED) {
             console.log('Fingerprint authentication cancelled');
           } else console.error(error)
        });

    } else {
      // fingerprint auth isn't available
    }
  })
  .catch(error => console.error(error));
  }

gg(){
  this.navCtrl.setRoot(RegistartionPage, {
  }, {animate:false});
}
changeLang(lang: string){
  if(lang=="th"){
    this.translate.use("th");
    localStorage.setItem('lang','th');
  }else if(lang=="en"){
    this.translate.use("en");
    localStorage.setItem('lang','en');
  }
}
}
