import { Component } from '@angular/core';
import {  NavController, NavParams, Platform, ViewController, ModalController } from 'ionic-angular';
import { App, MenuController } from 'ionic-angular';
import { TaProvider } from '../../providers/ta/ta';
import { Subscription } from 'rxjs/Subscription';
import { AlertController } from 'ionic-angular';
import { ListstatusPage } from '../liststatus/liststatus';

import { Geolocation } from '@ionic-native/geolocation';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ImageResizer, ImageResizerOptions } from '@ionic-native/image-resizer';


@Component({
  selector: 'page-addleave',
  templateUrl: 'addleave.html',
  providers: [Camera]
})
export class AddleavePage {

  menu: string = "add";

  datenow: any;

  button = true;
  calendar = true;
  startdate: any;
  enddate: any;
  seconds: any;
  datas: any;
  insertData: any = {};
  day: any = 0;
  hour: any = 0;
  minute: any = 0;


  public photos: any;
  public base64Image: string;

  constructor(public navCtrl: NavController,
    public appCtrl: App,
    public modalCtrl: ModalController,
    public navParams: NavParams,
    public taservice: TaProvider,
    public viewCtrl: ViewController,
    public alertCtrl: AlertController,
    private geolocation: Geolocation,
    private camera: Camera,
    private imageResizer: ImageResizer) {
    this.getPosition();

    let aDate = new Date();
    console.log("aDate: "+aDate)
    aDate.setHours(aDate.getHours() - (aDate.getTimezoneOffset() / 60));
    this.insertData.startdate = aDate.toISOString();
    this.insertData.enddate = aDate.toISOString();
  }

  closemodal() {
    this.viewCtrl.dismiss();
  }

  ionViewDidLoad() {
    console.log(localStorage.getItem('user'));
  }

  getPosition() {
    navigator.geolocation.getCurrentPosition((resp) => {
      this.insertData.lat = resp.coords.latitude;
      this.insertData.lng = resp.coords.longitude;
    }, (error) => {
      console.log("GEOLOCATION Error:" + JSON.stringify(error));
    }, { timeout: 2000, enableHighAccuracy: true })
  }

  showAlert() {
    let alert = this.alertCtrl.create({
      title: 'ข้อมูลไม่ถูกต้อง!',
      subTitle: 'ไม่สามารถกำหนดเวลาน้อยกว่าวันเริ่มต้นได้!',
      buttons: ['ตกลง']
    });
    alert.present();
  }

  showConfirm() {
    let confirm = this.alertCtrl.create({
      title: 'บันทึกข้อมูลการลา',
      message: 'คุณแน่ใจว่าต้องการส่งคำร้องนี้ใช่หรือไม่?',
      buttons: [
        {
          text: 'ยกเลิก',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'ตกลง',
          handler: () => {
            console.log('Agree clicked');
            // this.userinsertData(this.insertData);
          }
        }
      ]
    });
    confirm.present();
  }

  // userinsertData(data: any) {
  //   console.log(this.insertData);
  //   this.taservice.insertTARecord(this.insertData).subscribe(
  //     (resData) => {
  //       this.datas = resData;
  //       console.log("Response Data:" + JSON.stringify(resData));
  //       this.insertData = { type: null, startdate: null, enddate: null, comment: null };
  //       this.day = 0;
  //       this.hour = 0;
  //       this.minute = 0;
  //       // this.navCtrl.push(ListstatusPage);
  //       let modal = this.modalCtrl.create(ListstatusPage);
  //       modal.present();

  //       this.button = true;
  //     },
  //     (errData) => {
  //       console.log("Error Data:" + JSON.stringify(errData));
  //     }
  //   );
  // }

  // เช็ควัน ให้เลือกวันที่ จากและถึงให้ถูกต้อง
  public checkdate() {
    this.startdate = Date.parse(this.insertData.startdate) / 1000;
    this.enddate = Date.parse(this.insertData.enddate) / 1000;
    // this.starttime = parseInt(this.insertData.starttime);
    // this.endtime = parseInt(this.insertData.endtime);

    console.log(this.startdate + ' ' + this.enddate);

    if (this.enddate > this.startdate) {
      console.log("ถูกต้อง");
      console.log((this.enddate - this.startdate));
      this.seconds = (this.enddate - this.startdate);
      this.day = (this.seconds / 86400);
      this.hour = ((this.seconds % 86400) / 3600);
      this.minute = ((this.seconds % 3600) / 60);
      this.day = parseInt(this.day);
      this.hour = parseInt(this.hour);
      this.minute = parseInt(this.minute);
      this.button = false;
    } else {
      if (this.startdate && this.enddate) {
        this.button = true;
        this.showAlert();
      }

      this.day = 0;
      this.hour = 0;
      this.minute = 0;
    }

  }

  public checkleave() {


    if (this.insertData.type != "") {
      console.log("ถูกต้อง");
      this.calendar = false;
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

  // ngOnInit() {
  //   this.photos;
  // }

  // takePhoto() {
  //   this.camera.getPicture({
  //     destinationType: this.camera.DestinationType.FILE_URI,
  //     sourceType: this.camera.PictureSourceType.CAMERA,
  //     mediaType: this.camera.MediaType.PICTURE,
  //     encodingType: this.camera.EncodingType.JPEG,
  //     saveToPhotoAlbum: false,
  //   }).then((imageData) => {
  //     this.photos = 'data:image/jpeg;base64,' + imageData;
  //     console.log("base64 : " + imageData);
  //     this.imageResizer.resize({
  //       uri: imageData,
  //       quality: 60,
  //       width: 320,
  //       height: 480
  //     })
  //   }, (err) => {
  //   });
  // }

  takePhoto() {
    let options: CameraOptions = {
      quality : 90,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.CAMERA,
      encodingType: this.camera.EncodingType.JPEG, 
      mediaType: this.camera.MediaType.PICTURE,
      saveToPhotoAlbum: false,
      correctOrientation: true,
      cameraDirection: 0,
      targetWidth: 320,
      targetHeight: 480
    } 
    this.camera.getPicture(options).then((imageData) => {
      this.photos = 'data:image/jpeg;base64,' + imageData;
      console.log("base64 : " + imageData);
    }, (err) => {
    });
  }
  // takePhoto() {
  //   let options: CameraOptions = {
  //     quality: 50,
  //     destinationType: this.camera.DestinationType.FILE_URI,
  //     encodingType: this.camera.EncodingType.JPEG, //เลือกนามสกุลรูป
  //     mediaType: this.camera.MediaType.PICTURE,
  //     saveToPhotoAlbum: false,
  //     correctOrientation: true,      
  //     targetWidth: 320,
  //     targetHeight: 480,
  //     cameraDirection:0,
  //   }
  //   this
  //     .camera
  //     .getPicture(options)
  //     .then((imageData) => {
  //       this.base64Image = imageData;
  //       console.log("this.base64Image"+this.base64Image);
  //       this
  //         .photos
  //         .push(this.base64Image);
  //       this.insertData.image = this.base64Image;
  //       this
  //         .photos
  //         .reverse();
  //     }, (err) => {
  //       console.log(err);
  //     });
  // }

  deletePhoto(index) {
    let confirm = this
      .alertCtrl
      .create({
        title: 'คุณต้องการลบรูป ?',
        message: '',
        buttons: [
          {
            text: 'ยกเลิก',
            handler: () => {
              console.log('Disagree clicked');
            }
          }, {
            text: 'ตกลง',
            handler: () => {
              console.log('Agree clicked');
              this.photos.splice(index, 1);
              // this.photos.splice(index);
              //return true;
            }
          }
        ]
      });
    confirm.present();
  }
}

