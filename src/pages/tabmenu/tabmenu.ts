import { Component, ViewChild } from '@angular/core';
import {  NavController, NavParams, Tabs, Nav,AlertController } from 'ionic-angular';

//------------------------------------------Pages--------------------------------------//
import { AddleavePage } from '../addleave/addleave';
import { OtPage } from '../ot/ot';
import { ServiceRecordPage } from '../service-record/service-record';
import { MenutwoPage } from '../menutwo/menutwo';
import { LoginPage } from '../login/login';
import { MenuTransactionPage } from '../menu-transaction/menu-transaction';
import { MenuRequestPage } from '../menu-request/menu-request';
import { SettingPage } from '../setting/setting';
import { PayslipPage } from "../payslip/payslip";
import { HomePage  } from "../home/home";
import { AuthPage } from "../auth/auth";
import { LeavePage } from "../leave/leave";

@Component({
  selector: 'page-tabmenu',
  templateUrl: 'tabmenu.html',
})
export class TabmenuPage {

  @ViewChild(Nav) nav: Nav;
  tab1 = HomePage;
  // tab2 = MenutwoPage;
  tab3 = AuthPage;
  tab4 = LeavePage;
  tab5 = OtPage;
  tab6 = SettingPage;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabmenuPage');
  }
  

}