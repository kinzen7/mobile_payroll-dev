import { MyApp } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';
import { AgmCoreModule } from '@agm/core';
import { ImageResizer } from "@ionic-native/image-resizer";
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';;
import { File } from '@ionic-native/file';
// import { AgmSnazzyInfoWindowModule } from '@agm/snazzy-info-window';
import { Geolocation } from '@ionic-native/geolocation';
import {Camera} from '@ionic-native/camera';
import {AndroidFingerprintAuth} from '@ionic-native/android-fingerprint-auth';
import { Device } from '@ionic-native/device';
import { OneSignal } from '@ionic-native/onesignal';
import { DatePipe } from '@angular/common';
import { DatePickerModule } from 'ionic2-date-picker';
import { Network } from '@ionic-native/network';
import { Deeplinks } from '@ionic-native/deeplinks';
import { SocialSharing } from '@ionic-native/social-sharing';
import {TranslateStaticLoader} from'ng2-translate';
//------------------------------------------Pages--------------------------------------//
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { AddleavePage } from '../pages/addleave/addleave';
import { OtrequestPage } from '../pages/otrequest/otrequest';
import { ListstatusPage} from '../pages/liststatus/liststatus';
import { TaProvider } from '../providers/ta/ta';
import { OtstatusPage} from '../pages/otstatus/otstatus';
import { ListdetailPage } from '../pages/listdetail/listdetail';
import { OtdetailPage } from '../pages/otdetail/otdetail';
import { ServiceRecordPage } from '../pages/service-record/service-record';
import { MenutwoPage } from '../pages/menutwo/menutwo';
import { MapPage } from '../pages/map/map';
import { TabmenuPage } from '../pages/tabmenu/tabmenu';
import { MenuRequestPage } from '../pages/menu-request/menu-request';
import { MenuTransactionPage } from '../pages/menu-transaction/menu-transaction';
import { SettingPage } from '../pages/setting/setting';
import { DetailsClokinoutPage } from '../pages/details-clokinout/details-clokinout';
import { RegistartionPage } from "../pages/registartion/registartion";
import { PayslipPage } from "../pages/payslip/payslip";
import { BackgroundPage } from "../pages/cards/background/pages";
import { ProfilePage } from "../pages/profile/profile";
import { EditprofilePage } from "../pages/editprofile/editprofile";
import { UpdatetaxPage } from "../pages/updatetax/updatetax";
import { AuthPage } from "../pages/auth/auth";
import { OtPage } from "../pages/ot/ot";
import { LeavePage } from "../pages/leave/leave";
import { OtapprovePage } from "../pages/otapprove/otapprove";
import { LeaveapprovePage } from "../pages/leaveapprove/leaveapprove";
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { Http } from '@angular/http';
import { CalendarModule } from "ion2-calendar";

export function createTranslateLoader(http: Http) {
  return new TranslateStaticLoader(http, './assets/lang', '.json');
}
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    AddleavePage,
    OtrequestPage,
    ListstatusPage,
    OtstatusPage,  
    ListdetailPage,
    OtdetailPage,
    MapPage,
    ServiceRecordPage,
    MenutwoPage,
    TabmenuPage,
    MenuRequestPage,
    MenuTransactionPage,
    SettingPage,
    DetailsClokinoutPage,
    RegistartionPage,
    PayslipPage,
    BackgroundPage,
    ProfilePage,
    EditprofilePage,
    UpdatetaxPage,
    AuthPage,
    OtPage,
    LeavePage,
    OtapprovePage,
    LeaveapprovePage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    DatePickerModule,
    CalendarModule,
    IonicModule.forRoot(MyApp,{
      monthNames: ['มกราคม', 'กุมภาพันธ์', 'มีนาคม','เมษายน','พฤษภาคม','มิถุนายน','กรกฏาคม','สิงหาคม','กันยายน','ตุลาคม','พฤศจิกายน','ธันวาคม'],
      monthShortNames: ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.','พ.ค.','มิ.ย.','ก.ค.','ส.ค.','ก.ย.','ต.ค.','พ.ย.','ธ.ค.' ],
      dayNames: ['จันทร์','อังคาร','พุธ','พฤหัสบดี','ศุกร์','เสาร์','อาทิตย์'],
      dayShortNames: ['จ.','อ.','พ.','พฤ.','ศ.','ส.','อา.'],
    }),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDOE4sGCByneD6_PdPCDgUBPZzgtjwneKU'
    }),TranslateModule.forRoot({ loader: {
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [Http]
  }}),
    // AgmSnazzyInfoWindowModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    AddleavePage,
    OtrequestPage,
    ListstatusPage,
    OtstatusPage,    
    ListdetailPage,
    OtdetailPage,
    MapPage,
    ServiceRecordPage,
    MenutwoPage,
    TabmenuPage,
    MenuRequestPage,
    MenuTransactionPage,
    SettingPage,
    DetailsClokinoutPage,
    RegistartionPage,
    PayslipPage,
    BackgroundPage,
    ProfilePage,
    EditprofilePage,
    UpdatetaxPage,
    AuthPage,
    OtPage,
    LeavePage,
    OtapprovePage,
    LeaveapprovePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    TaProvider,
    Camera,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Geolocation,
    AndroidFingerprintAuth,
    Device,
    OneSignal,
    ImageResizer,
    DatePipe ,
    Network,
    Deeplinks,
    SocialSharing,
    FileTransfer,
    FileTransferObject,
    File
  ]
})
export class AppModule {}
