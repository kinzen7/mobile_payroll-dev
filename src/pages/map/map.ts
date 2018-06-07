import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { TaProvider } from '../../providers/ta/ta';
// import { AgmInfoWindow } from '@agm/core';
// import {
//   GoogleMaps,
//   GoogleMap,
//   GoogleMapsEvent,
//   GoogleMapOptions,
//   CameraPosition,
//   MarkerOptions,
//   Marker
//  } from '@ionic-native/google-maps';

declare var google: any;
declare var map: any;
declare var infowindow;


@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})

export class MapPage {

  map: HTMLElement;
  lat:any;
  lng:any;
  latLng:any;
  getlo:any;

  insertData:any={};

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public taservice : TaProvider,
              private geolocation: Geolocation) {
         
              this.initMap();
              
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapPage');  
  }

  // getPosition(){
  //   navigator.geolocation.getCurrentPosition((resp)=>{
  //     console.log("GEOLOCATION Success:"+JSON.stringify(resp));
  //     this.insertData.lat = resp.coords.latitude;
  //     this.insertData.lng = resp.coords.longitude;
  //     this.get_location(this.insertData);
  //     // this.get_location(this.lat,this.lng);
  //   },(error)=>{
  //     console.log("GEOLOCATION Error:"+JSON.stringify(error));
  //   },{ timeout: 2000, enableHighAccuracy: true })
  // }

  get_location(insertData:any){
    // console.log("From get_location:"+this.insertData.lat+":"+this.insertData.lng);
  	this.taservice.get_locations(this.insertData).subscribe(
  			(resData)=>{    
          this.getlo = JSON.stringify(resData);
          console.log("Response Data:"+JSON.stringify(resData));
          // console.log("this.insertData"+this.insertData);        
  			},
  			(errData)=>{
  				console.log("Error Data:"+JSON.stringify(errData));
  			}	
  		);
  }

  public initMap() {
    
    navigator.geolocation.getCurrentPosition((position) =>{
    this.latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    this.insertData.lat = position.coords.latitude;
    this.insertData.lng = position.coords.longitude;
    this.get_location(this.insertData);
    
    var optionmap = {
      zoom: 15,
      center: this.latLng,
      mapTypeId: 'terrain'
    }

    this.map = new google.maps.Map(document.getElementById('map'), optionmap);
  
    var cityCircle = new google.maps.Circle({
          strokeColor: '#FF0000',
          strokeOpacity: 0.8,
          strokeWeight: 8,
          fillColor: '#FF0000',
          fillOpacity: 0.35,
          map: this.map,
          center: this.latLng,
          radius: 500
        });

        var bounds = cityCircle.getBounds()
        // console.log('bounds:'+bounds);

        this.addMarker();
        this.markeremployee();
      });
  }

  addMarker() { 
    console.log("this.getlo:"+this.getlo);       
    var locations = [
      ['BTS สนามเป้า',13.7720375,100.5447343],
      ['BTS อารีย์',13.7750533,100.5471002],
      ['BTS อนุสาวรีย์ชัยฯ',13.7652828,100.5408228],
      ['AHOST',13.771182,100.540822],
      ['AHEAD',13.771164,100.540806],
      ['AVISION',13.771190,100.540606]
    ];
      var marker,i,info;
      for(i=0; i<locations.length; i++){
        marker = new google.maps.Marker({
          position: new google.maps.LatLng(locations[i][1],locations[i][2]),
          map: this.map          
      });
      // console.log('ชื่อ:'+locations[i][0]);
      info = new google.maps.InfoWindow();
      google.maps.event.addListener(marker, 'click', (function(marker,i) {
        return function(){
          info.setContent(locations[i][0]);
          info.open(this.map,marker);
        }
      })(marker,i));
     
    }
  }

  markeremployee(){
    var marker = new google.maps.Marker({
      position:  this.latLng,
      map: this.map,
      icon : 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
    });
    let content = "<h5>พนักงาน</h5>";
    this.addInfoWindow(marker,content);
  }

  addInfoWindow(marker, content) {
    let infoWindow = new google.maps.InfoWindow({
      content: content
    });
    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });
  }

}
