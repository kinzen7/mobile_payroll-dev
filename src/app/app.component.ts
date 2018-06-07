import { LoginPage } from './../pages/login/login';
import { Component, NgZone, ViewChild } from '@angular/core';
import { Nav, Platform, Config, Menu, MenuController, Events, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AlertController,ToastController  } from 'ionic-angular';// ใช้กับ Alert 
import { Subscription } from 'rxjs/Subscription';
import { OneSignal } from '@ionic-native/onesignal';
import { Device } from '@ionic-native/device';
import { Network } from '@ionic-native/network';
import { Deeplinks } from '@ionic-native/deeplinks';
import { SocialSharing } from '@ionic-native/social-sharing';
import { timer } from 'rxjs/observable/timer';
// page
import { OtrequestPage } from '../pages/otrequest/otrequest';
import { AddleavePage } from '../pages/addleave/addleave';
import { ListstatusPage } from '../pages/liststatus/liststatus';
import { OtstatusPage } from '../pages/otstatus/otstatus';
import { TaProvider } from '../providers/ta/ta';
import { ListdetailPage } from '../pages/listdetail/listdetail';
import { MapPage } from '../pages/map/map';
import { ServiceRecordPage } from '../pages/service-record/service-record';
import { MenutwoPage } from '../pages/menutwo/menutwo';
import { TabmenuPage } from '../pages/tabmenu/tabmenu';
import { MenuRequestPage } from '../pages/menu-request/menu-request';
import { MenuTransactionPage } from '../pages/menu-transaction/menu-transaction';
import { SettingPage } from '../pages/setting/setting';
import { RegistartionPage } from "../pages/registartion/registartion";
import { HomePage } from '../pages/home/home';
import { BackgroundPage } from "../pages/cards/background/pages";
import { UpdatetaxPage } from "../pages/updatetax/updatetax";
import { PayslipPage } from '../pages/payslip/payslip';
import { ProfilePage } from '../pages/profile/profile';
import { OtPage } from "../pages/ot/ot";
import { LeavePage } from '../pages/leave/leave';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';
import { LeaveapprovePage } from "../pages/leaveapprove/leaveapprove";
@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  @ViewChild(Nav) nav: Nav;
  
  // inputData: any = localStorage.getItem('user');
  // tname: any = localStorage.getItem('tname');
  // position: any = localStorage.getItem('position');
  public cust_acco:any;
  public counter=0;
  public alertShown:boolean = false;
public showSplash = true;

  public rootPage: any = LoginPage;

  constructor(public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public taservice: TaProvider,
    public menu: MenuController,
    public alertCtrl: AlertController,
    public events: Events,
    public oneSignal: OneSignal,
    public device: Device,
    public network : Network,
    public deeplinks: Deeplinks,
    public socialSharing: SocialSharing,
    public translate: TranslateService,
    public toastCtrl: ToastController
    ) {
      // this.initializeApp();

          // Init local lang
          if (localStorage.getItem('lang')==null) {
            localStorage.setItem('lang','th');
          }
          
          // Read lang from localstorage
          this.translate.use(localStorage.getItem('lang'));

      let disconnectSubscription = this.network.onDisconnect().subscribe(() => {

        
        let alert = this.alertCtrl.create({
          subTitle: 'ขาดการเชื่อมต่อ',
          message: 'โปรดตรวจสอบอินเทอร์เน็ตของคุณ',
          buttons: [{
                    text: 'OK',
                    handler: () => {
                      this.nav.setRoot(LoginPage);
                    }
                    
                }],
                cssClass: 'alertCustomCss'
        });
        alert.present();
      });
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();

      // platform.registerBackButtonAction(() => {
      //   if (this.alertShown==false) {
      //     this.presentConfirm();  
      //   }
      // }, 0)

      if (!platform.is('mobileweb') && !platform.is('windows') && !platform.is('core')) {
        this.oneSignal.getIds().then((data) => {
          localStorage.setItem('play_id',data.userId)
       });
        localStorage.setItem('uuid',this.device.uuid);
        this.init_play_id();

      }else{
        localStorage.setItem('play_id','THISISUUID')
        localStorage.setItem('uuid','Th15d3v1C3id');
      }
    });

    // localStorage.setItem('mobi_seqe','3');
    // localStorage.setItem('name','pichanon@a-host.co.th')
      // localStorage.setItem('com_seqe','null');
 

    // Clear LOCALSTORAGE BEFORE LOGIN////
    this.cust_acco=localStorage.getItem('cust_acco');
    //localStorage.clear();
    localStorage.setItem('cust_acco',this.cust_acco);
  if (localStorage.getItem('cust_acco') == 'null' || localStorage.getItem('register') !== "0") {
    console.log("INIT APP.");
    this.rootPage = LoginPage;
  } else {
    console.log("already INIT.");
    this.rootPage = LoginPage;
  }

    this.events.subscribe('login', (res: any) => {
      console.log("Login Data[app.component]:" + JSON.stringify(res));
      // localStorage.setItem("name",res[0].TFST_NAME+' '+res[0].TLST_NAME);
      // localStorage.setItem('payr_grop',res[0].PAYR_GROP);
      // this.tname = localStorage.getItem('tname');
      // this.position = localStorage.getItem('position');
    });

    
    platform.ready().then(() => {

      this.deeplinks.routeWithNavController(this.nav, {
        '/regis/:takenid': RegistartionPage
      }).subscribe((match) => {
          // match.$route - the route we matched, which is the matched entry from the arguments to route()
          // match.$args - the args passed in the link
          // match.$link - the full link data
          console.log('Successfully matched route', match);
        }, (nomatch) => {
          // nomatch.$link - the full link data
          console.error('Got a deeplink that didn\'t match', nomatch);
        });

  })
  

    
  }  //constructor  

  // initializeApp() {
  //   this.platform.ready().then(() => {

  //     this.statusBar.styleDefault();
  //     this.splashScreen.hide();
  //     // setTimeout(() => {
  //     //   this.splashScreen.hide();
  //     // }, 50);
  //     // this.splashScreen.hide();  // <-- hide static image

  //     // timer(2500).subscribe(() => this.showSplash = false) // <-- hide animation after 3s
  //   });
  // }

  presentConfirm() {
    let alert = this.alertCtrl.create({
      title: 'Confirm Exit',
      message: 'Do you want Exit?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
            this.alertShown=false;
          }
        },
        {
          text: 'Yes',
          handler: () => {
            console.log('Yes clicked');
            this.platform.exitApp();
          }
        }
      ]
    });
     alert.present().then(()=>{
      this.alertShown=true;
    });
  }

  init_play_id(){
    this.oneSignal.startInit('0db2ccb5-fddd-43d0-9910-5e7471edea07', '999974367899');
    this.oneSignal.getIds().then((data) => {
      localStorage.setItem('play_id',data.userId)
   });

    this.oneSignal.sendTag("AHOST","");
   
    this.oneSignal.endInit();
  }

  shareItem(item) {
    // this code is to use the social sharing plugin
    // message, subject, file, url
    this.socialSharing.share("Check this item:  demoapp://home/items/" + item.id, item.title, item.img)
    .then(() => {
    })
    .catch(() => {
    });
  }


  presentToast() {
    let toast = this.toastCtrl.create({
      message: "Press again to exit",
      duration: 3000,
      position: "middle"
    });
    toast.present();
  }

}//class


