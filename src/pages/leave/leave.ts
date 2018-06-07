import { Component } from '@angular/core';
import {  NavController, NavParams, ModalController } from 'ionic-angular';
import { DatePickerProvider } from 'ionic2-date-picker';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { LoadingController, ToastController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { AlertController } from 'ionic-angular';
import { TaProvider } from '../../providers/ta/ta';
import { Events } from 'ionic-angular'
import { LeaveapprovePage } from "../leaveapprove/leaveapprove";
import { ListdetailPage } from '../listdetail/listdetail';
import { DatePipe } from '@angular/common';
import { CalendarComponentOptions,CalendarModal,CalendarModalOptions ,CalendarResult} from 'ion2-calendar'

/**
 * Generated class for the LeavePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-leave',
  templateUrl: 'leave.html',
})
export class LeavePage {

  imageURI:any;
  imageFileName:any;
  insertData: any = {};
  datas_approved:any;
  datas_waiting:any;
  datas_reject:any;
  reqe_datas:any;
  leave_type:any;
  enable_btn0:boolean = false;
  enable_btn:boolean = false;
  
  items: any = [];
  itemHeight: number = 100;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private datePickerProvider: DatePickerProvider,public modalCtrl:ModalController,
    private camera: Camera,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public taservice: TaProvider,
    public datepipe: DatePipe,
    public events:Events) {

    this.check_grop();
    this.listenEvents();

    this.items = [
      {expanded: false},
      {expanded: false},
      {expanded: false},
      {expanded: false},
      {expanded: false},
      {expanded: false},
      {expanded: false},
      {expanded: false},
      {expanded: false}
  ];

  }

  public isManagement:boolean=false;
  // public date_from:any='เลือกวันที่';
  // public date_to:any='ถึงวันที่';
  public menu:any='request';
  public localDate: Date = new Date();
  public initDate: Date = new Date();
  public maxDate: Date = new Date(new Date().setDate(new Date().getDate() + 30));
  public minDate: Date = new Date(new Date().setDate(new Date().getDate() - 30));

  public photos: any;
  public base64Image: string;
  public message_date:any;


  ngOnInit() {
    this.photos = [];
  }



  listenEvents(){
    this.events.subscribe('reloadDetails',() => {
      this.load_query();
    });
  }


  expandItem(item){
 
    this.items.map((listItem) => {

        if(item == listItem){
            listItem.expanded = !listItem.expanded;
        } else {
            listItem.expanded = false;
        }

        return listItem;

    });
  }

  ionViewDidLoad() {
    // this.insertData.day_type = "1";
    console.log('ionViewDidLoad LeavePage');
    this.load_query();
    this.get_leave();
  }

  prepare_data_all(){
   
        this.insertData.noof_hour = null;
        this.insertData.noof_days = null;
        this.insertData.leave_from = null;
        this.insertData.leave_to = null;
        this.message_date = null;
 
    console.log(this.insertData);
  }

  prepare_data_half(){
    
      this.insertData.leave_from = null;
      this.insertData.leave_to = null;
      this.insertData.noof_days = 0.5;
      this.insertData.noof_hour = 4;
      this.message_date = null;
    
    console.log(this.insertData);
  }


  prepare_data_custom(){
    
    this.insertData.leave_from = null;
    this.insertData.leave_to = null;
    this.insertData.noof_days = null;
    this.insertData.noof_hour = null;
    this.message_date = null;
  
  console.log(this.insertData);
}

  get_leave(){ /// GET LEAVE TYPE
      	this.taservice.get_leave().subscribe(
  			(resData)=>{
          this.leave_type=resData;
          console.log("Response Data:"+JSON.stringify(resData));
          console.log(this.datepipe.transform(Date(), 'yyyyMMdd'));
          // this.navCtrl.push(OtstatusPage);
          // let modal = this.modalCtrl.create(OtstatusPage);
          // modal.present();
  			},
  			(errData)=>{
  				console.log("Error Data:"+JSON.stringify(errData));
  			}	
  		);
  }

  get_leave_bal(input){
    this.taservice.get_leave_bal(input).subscribe(
    (resData)=>{
      this.leave_type=resData;
      console.log("Response Data:"+JSON.stringify(resData));
      console.log(this.datepipe.transform(Date(), 'yyyyMMdd'));
      // this.navCtrl.push(OtstatusPage);
      // let modal = this.modalCtrl.create(OtstatusPage);
      // modal.present();
    },
    (errData)=>{
      console.log("Error Data:"+JSON.stringify(errData));
    }	
  );
}

  load_query(){
    if (this.menu == "status") {
      this.user_review_leave(1,0); //Short format
      this.user_review_leave(2,0); //Short format
      this.user_review_leave(4,0); //Short format
      console.log("status")
    } 
    // else if (this.menu == "cancel") {
    //   console.log("cancel")
    //   this.get_leave_request(localStorage.getItem("mobi_seqe"));
    // }
     else if (this.menu == "approve") {
      console.log("approve")
      this.view_request();
    } else {
      console.log("request")
    } {
      
    } {
      
    }
  }

  view_request(){
    console.log("Insert DATA="+this.insertData);
    let loader = this.loadingCtrl.create({
      content: "กำลังดึงข้อมูลคำร้อง...",
      // duration: 1000
    });
    loader.present();
    console.log('call api view request leave')
    // loader.dismiss();
  	this.taservice.review_leave_request().subscribe(
  			(resData)=>{
          loader.dismiss();
          if(resData != '-1')
          {this.reqe_datas=resData;}else if(resData == '-1'){this.reqe_datas=[];}
          console.log("Response Data:"+JSON.stringify(resData));
          // this.navCtrl.push(OtstatusPage);
          // let modal = this.modalCtrl.create(OtstatusPage);
          // modal.present();
  			},
  			(errData)=>{
          this.reqe_datas=[];
          loader.dismiss();
  				console.log("Error Data:"+JSON.stringify(errData));
  			}	
  		);
  } 

//// ------------------------------------------------------- USER REVIEW LEAVE STATUS -------------------------------------------///

  

  user_review_leave(status:any,format:any){ // GET LEAVE REQUEST STATUS 1[WAIT]
    console.log("Insert DATA="+this.insertData);
    let loader = this.loadingCtrl.create({
      content: "กำลังดึงข้อมูล...",
      // duration: 1000
    });
    loader.present();
    console.log('call api user_review_leave_waiting')
    // loader.dismiss();
    this.insertData.leav_stat = status;
    this.insertData.leav_format = format;
    
  	this.taservice.user_review_leave(this.insertData).subscribe(
  			(resData)=>{
          loader.dismiss();
          if(resData != '-1')
          {
            if (status == 1) { // 1 = Waiting
              this.datas_waiting = resData;
            }else if (status == 2) { //2 = Approved
              this.datas_approved = resData;
            } else if(status == 4){ // 4 = Reject
              this.datas_reject = resData;
            }
            
          }
          else if(resData == '-1'){
            
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
  				console.log("Error Data:"+JSON.stringify(errData));
  			}	
  		);
  }  

  



  leave_admin(selectItem:any){
    console.log("Select Item :"+JSON.stringify(selectItem));
    let modal = this.modalCtrl.create(LeaveapprovePage,selectItem);
    modal.present();
    // this.navCtrl.push(OtdetailPage,selectItem);
    //push(OtdetailPage,selectItem); เปลี่ยนหน้าไปหน้า ListdetailPage พร้อมกับส่งพารามิเตอร์ selectItem ของตัวนั้นๆไปด้วย
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
            this.leave_request(this.insertData);
          }
        }
      ]
    });
    confirm.present();
  }

  leave_request(data: any) {
    console.log(this.insertData);
    let loader = this.loadingCtrl.create({
      content: "กำลังส่งคำขอ...",
      // duration: 1000
    });
    loader.present();
    console.log('call api leave request!')
    if(this.insertData.time_to != null && this.insertData.time_from != null){
      this.insertData.time_to = this.insertData.time_to.replace(":",".");
      this.insertData.time_from =  this.insertData.time_from.replace(":",".");
    this.insertData.noof_hour = this.insertData.time_to - this.insertData.time_from;
    console.log('NOOF HOUR:'+this.insertData.noof_hour);
  }
    // loader.dismiss();
    this.taservice.request_leave_request(this.insertData).subscribe(
      (resData) => {
        loader.dismiss();
        this.menu = "status";
        // this.datas = resData;
        console.log("Response Data:" + JSON.stringify(resData));
        this.insertData = {};
        this.message_date = '';
        this.enable_btn0 = false;
        this.enable_btn = false;
        // this.insertData = { type: null, startdate: null, enddate: null, comment: null };
        // this.navCtrl.push(ListstatusPage);
      //   let modal = this.modalCtrl.create(ListstatusPage);
      //   modal.present();

      //   this.button = true;
      },
      (errData) => {
        console.log("Error Data:" + JSON.stringify(errData));
      }
    );
  }
  
  clickItem(selectItem:any){
    console.log("Select Item :"+JSON.stringify(selectItem));
    // this.navCtrl.push(ListdetailPage,selectItem);
    let modal = this.modalCtrl.create(ListdetailPage,selectItem);
    modal.present();
    //push(ListdetailPage,selectItem); เปลี่ยนหน้าไปหน้า ListdetailPage พร้อมกับส่งพารามิเตอร์ selectItem ของตัวนั้นๆไปด้วย
  }

display_btn(){
  this.enable_btn = true;
}
display_btn0(){
  this.enable_btn0 = true;
}

  public check_grop(){
    if(localStorage.getItem('mobi_role')=='M_APPROVER'){
      this.isManagement=true;
      console.log('M_APPROVER!');
    }else{this.isManagement=false;console.log('NOT M_APPROVER');}
  }

  // showCalendar_from() {
  //   const dateSelected = 
  //     this.datePickerProvider.showCalendar(this.modalCtrl);

  //   dateSelected.subscribe(date => 
  //     this.insertData.leave_from = this.datepipe.transform(date, 'yyyyMMdd')
  //   );
  //   // dateSelected.subscribe(date => 
  //   //   this.date_from = date.toLocaleDateString("th-TH")
  //   // );
  //   console.log('INSERT DATA:'+this.insertData.leave_from);
  //   // console.log('THIS DATEFROM:'+this.date_from);
  // }

  // showCalendar_to() {
  //   const dateSelected = 
  //     this.datePickerProvider.showCalendar(this.modalCtrl);

  //   dateSelected.subscribe(date => 
  //     this.insertData.leave_to = this.datepipe.transform(date, 'yyyyMMdd')
  //   );
  //   // dateSelected.subscribe(date => 
  //   //   this.date_to = date.toLocaleDateString("th-TH")
  //   // );
  // }

  openCalendar_multi() {
    const options: CalendarModalOptions = {
      //disableWeeks: [0, 100],
      disableWeeks:[],
      pickMode: 'range',
      monthFormat: 'MMMM',
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

    myCalendar.onDidDismiss((date: { from: CalendarResult; to: CalendarResult }, type: string ) => {
      if(date){
      console.log(date.from.dateObj);
      this.insertData.leave_from = this.datepipe.transform(date.from.dateObj, 'yyyyMMdd')
      console.log(date.to.dateObj);
      this.insertData.leave_to = this.datepipe.transform(date.to.dateObj, 'yyyyMMdd')
      console.log(this.insertData);
      this.message_date = 'จาก '+date.from.dateObj.toLocaleDateString("th-TH")+' ถึง '+date.to.dateObj.toLocaleDateString("th-TH");
            }
    });
}

openCalendar() {
  const options: CalendarModalOptions = {
    //disableWeeks: [0, 100],
    disableWeeks:[],
    // pickMode: 'range',
    monthFormat: 'MMMM',
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

  myCalendar.onDidDismiss((date: CalendarResult, type: string ) => {
    if(date){
    console.log(date);
    this.insertData.leave_from = this.datepipe.transform(date.dateObj, 'yyyyMMdd')
    this.insertData.leave_to =  this.datepipe.transform(date.dateObj, 'yyyyMMdd')
console.log(this.insertData);

    this.message_date = date.dateObj.toLocaleDateString("th-TH");
  }
  });
}
  
  // takePhoto() {
  //   const options: CameraOptions = {
  //     quality : 90,
  //     destinationType: this.camera.DestinationType.DATA_URL,
  //     sourceType: this.camera.PictureSourceType.CAMERA,
  //     //destinationType: this.camera.DestinationType.FILE_URI,
  //     //sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
  //     encodingType: this.camera.EncodingType.JPEG, 
  //     mediaType: this.camera.MediaType.PICTURE,
  //     saveToPhotoAlbum: false,
  //     correctOrientation: true,
  //     cameraDirection: 0,
  //     targetWidth: 320,
  //     targetHeight: 480
  //   } 
  //   this.camera.getPicture(options).then((imageData) => {
  //     this.photos = 'data:image/jpeg;base64,' + imageData;
  //     this.imageURI = imageData;

  //     this.upload(imageData);
  //     console.log("base64 : " + imageData);
  //     this.presentToast('GET IMAGE SUCCESS');
  //   }, (err) => {
  //     this.presentToast('GET IMAGE ERROR');
  //   });
  // }

  takePhoto() {
    const options : CameraOptions = {
      quality: 50, // picture quality
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE,
      saveToPhotoAlbum: false,
      correctOrientation: true,
      cameraDirection: 0,
      targetWidth: 320,
      targetHeight: 480
    }
    this.camera.getPicture(options) .then((imageData) => {
        this.base64Image = "data:image/jpeg;base64," + imageData;
        this.photos.push(this.base64Image);
        this.photos.reverse();
        this.upload(this.base64Image);
      }, (err) => {
        console.log(err);
      });
  }



  upload(data:any){
    // this.presentToast('begin upload...');
    // this.presentToast(this.imageURI);
    // this.taservice.upload(data);
    this.taservice.upload(data).subscribe(
      (resData) => {
        this.presentToast('success upload');
        // // loader.dismiss();
        // this.menu = "status";
        // // this.datas = resData;
        // console.log("Response Data:" + JSON.stringify(resData));
        // this.insertData = {};
        // this.message_date = '';
        // this.enable_btn0 = false;
        // this.enable_btn = false;
        // this.insertData = { type: null, startdate: null, enddate: null, comment: null };
        // this.navCtrl.push(ListstatusPage);
      //   let modal = this.modalCtrl.create(ListstatusPage);
      //   modal.present();

      //   this.button = true;
      },
      (errData) => {
        this.presentToast('failed upload');
        console.log("Error Data:" + JSON.stringify(errData));
      }
    );
  }
  
 
  
  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom'
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }
  dismiss() {
    this.navCtrl.setRoot(HomePage);
  }

//  deletePhoto(index) {
//     let confirm = this
//       .alertCtrl
//       .create({
//         title: 'คุณต้องการลบรูป ?',
//         message: '',
//         buttons: [
//           {
//             text: 'ยกเลิก',
//             handler: () => {
//               console.log('Disagree clicked');
//             }
//           }, {
//             text: 'ตกลง',
//             handler: () => {
//               console.log('Agree clicked');
//               this.photos.splice(index, 1);
//               // this.photos.splice(index);
//               //return true;
//             }
//           }
//         ]
//       });
//     confirm.present();
//   }

deletePhoto(index) {
  let confirm = this.alertCtrl.create({
      title: 'Sure you want to delete this photo? There is NO undo!',
      message: '',
      buttons: [
        {
          text: 'No',
          handler: () => {
            console.log('Disagree clicked');
          }
        }, {
          text: 'Yes',
          handler: () => {
            console.log('Agree clicked');
            this.photos.splice(index, 1);
          }
        }
      ]
    });
  confirm.present();
}

random(){
  return Math.random();
}

}
