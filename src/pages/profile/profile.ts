import { Component } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';
import { EditprofilePage } from "../editprofile/editprofile";
import { UpdatetaxPage } from "../updatetax/updatetax";
import { HomePage } from '../home/home';
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {

  tname:any = localStorage.getItem('tname')
  ename:any = localStorage.getItem('ename')
  email:any = localStorage.getItem('email');
  payr_grop:any = localStorage.getItem('payr_grop');
  imgAvatar:any = localStorage.getItem('avatar');
  

  constructor(public navCtrl: NavController
              ,public viewCtrl:ViewController) {
                this.MOBI_SEQE = localStorage.getItem('mobi_seqe');
  }

  MOBI_SEQE:any = localStorage.getItem('mobi_seqe');

  open_editprofile_page(){
    console.log('test');
    this.navCtrl.setRoot(EditprofilePage, {
    }, {animate:false});
  }

  open_updatetax_page(){
    console.log('tax');
    this.navCtrl.setRoot(UpdatetaxPage, {
    }, {animate:false});
  }

  dismiss() {
    this.navCtrl.setRoot(HomePage);
  }

  random(){
    return Math.random();
  }
  
}
