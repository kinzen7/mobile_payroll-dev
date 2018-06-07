import { Component } from '@angular/core';
import { TaProvider } from '../../providers/ta/ta';
import { NavController, ViewController } from 'ionic-angular';
import { DatePipe } from '@angular/common';
import { ProfilePage } from '../profile/profile';
import { LoadingController, ToastController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import {DomSanitizer} from '@angular/platform-browser';
import { File } from '@ionic-native/file';
// import { FilePath } from '@ionic-native/file-path';
declare var window;
@Component({
  templateUrl: 'editprofile.html'
})
export class EditprofilePage { 
  
  imageURI:any;
  public photos: any;
  public base64Image: string;
  public sizeInMb: any;

  constructor(
    public taservice : TaProvider,
    public datepipe: DatePipe,
    public navCtrl:NavController,
    public loadingCtrl: LoadingController,
    private camera: Camera,
    public toastCtrl: ToastController,
    public _DomSanitizer: DomSanitizer,
    // public filePath:FilePath,
    public file:File,
) {
  
}


menu:any = "profile";
input:any={};
insertData:any;
datas:any;
update_datas:any;
payr_grop:any=localStorage.getItem("payr_grop");
MOBI_SEQE:any = localStorage.getItem('mobi_seqe');
imgAvatar:any = localStorage.getItem('avatar');


  ionViewDidLoad() {

    let loader = this.loadingCtrl.create({
      content: "กำลังโหลดข้อมูลส่วนตัว...",
      // duration: 1000
    });

    
    loader.present();

   this.input.mobi_seqe = localStorage.getItem('mobi_seqe');
   this.input.profile = "15";
   this.input.in_bound = this.datepipe.transform(new Date, 'yyyyMMdd');
   this.taservice.request_user_info(this.input).subscribe(
      (res)=>{
        loader.dismiss();
        this.datas = res;
        this.insertData = res;
        console.log('Request USER INFO: '+JSON.stringify(res));
        console.log('[insertData]: '+JSON.stringify(this.insertData));
  },
  (err)=>{
    loader.dismiss();
    console.log("ERROR:"+JSON.stringify(err));
  }
          );
  }

  random(){
    return Math.random();
  }

  dismiss() {
    this.navCtrl.setRoot(ProfilePage);
  }


  takePhoto() {
    const options: CameraOptions = {
      // quality : 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      // sourceType: this.camera.PictureSourceType.PHOTOLIBRARY ,
      encodingType: this.camera.EncodingType.JPEG, 
      mediaType: this.camera.MediaType.PICTURE,
      saveToPhotoAlbum: false,
      allowEdit: true,
      // correctOrientation: true,
      cameraDirection: 0,
      // targetWidth: 320,
      // targetHeight: 480
      // encodingType: this.camera.EncodingType.PNG
    } 
    this.camera.getPicture(options).then((imageData) => {
      console.log('IMG DATA: '+ imageData);
      // this.photos = 'data:image/jpeg;base64,' + imageData;
      // this.imageURI = this._DomSanitizer.bypassSecurityTrustUrl(this.photos);

    //   var self = this;
    //   window.resolveLocalFileSystemURL(imageData, (fileEntry) => {
        
    //     fileEntry.getMetadata((metadata) => {
    //         // console.log("image size : " + metadata.size);
    //         // console.log("image date : " + metadata.modificationTime);
    //         this.presentToast(metadata.size);
    //     });

    //     fileEntry.file((fileObject) => {
    //       this.presentToast("1234");
    //         var reader = new FileReader()
    //         reader.onloadend = (evt) => {
    //           self.presentToast(evt.target["result"]);
    //           // self.transferForm.controls.slip_imgbase64.setValue(imageData);
    //           // self.img_source = evt.target["result"];
    //         }
    //         reader.readAsDataURL(fileObject);
    //     }, function(){ console.error("There was an error reading or processing this file.") })
    // }, (error) => { console.error(error); });

  
      // var stringLength = imageData.length;
      // // var stringLength = this.photos.length - 'data:image/jpeg;base64,'.length;
      
      // var sizeInBytes = 4 * Math.ceil((stringLength / 3));
      // var sizeInKb=sizeInBytes/1000;
      // this.sizeInMb=sizeInKb/1000;

      this.upload(imageData);
      // console.log("base64 : " + imageData);
      // this.presentToast('Size: '+sizeInBytes);
    }, (err) => {
      this.presentToast('GET IMAGE ERROR');
    });
  }
  upload(data:any){
    // this.presentToast('begin upload...');
    // this.presentToast(this.imageURI);
    // this.taservice.upload(data);
    let loader = this.loadingCtrl.create({
      content: "กำลังบันทึกรูปภาพ...",
      // duration: 1000
    });
    loader.present();
    this.taservice.up_lara(data).subscribe(
      (resData) => {
        // this.presentToast('success upload! Size: ' +this.sizeInMb + ' Mb.');
        this.presentToast('SUCCESS!!!!!!');
        this.taservice.get_avatar().subscribe(
          (res_info)=>{
            localStorage.setItem('avatar_md5',res_info.md5);
            localStorage.setItem('avatar',res_info.content);
            this.imgAvatar = localStorage.getItem('avatar');
            // console.log(JSON.stringify(res_info));
            console.log(JSON.stringify(res_info.md5));
            loader.dismiss();
      },
      (err)=>{
        loader.dismiss();
        console.error('ERROR GET AVATAR');
      }
              );
      },
      (errData) => {
        this.presentToast('ERROR!!!!!!!!!!!!!!!');
        loader.dismiss();
        // console.log("Error Data:" + JSON.stringify(errData));
      }
    );
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 10000,
      position: 'bottom'
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }
  
  deletePhoto(index) {

              this.photos.splice(index, 1);
 
  }
show_inbound(profile:any)

{
  console.log(this.insertData);
  this.taservice.request_update_profile(this.insertData).subscribe(
  (resData)=>{

    console.log("Response Data:"+JSON.stringify(resData));

  },
  (errData)=>{
    console.log("Error Data:"+errData);
  }	
);
}



}
