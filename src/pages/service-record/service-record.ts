import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ServiceRecordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-service-record',
  templateUrl: 'service-record.html',
})
export class ServiceRecordPage {

  menu: string = "customer";

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ServiceRecordPage');
  }

  // addEmployee(){      
  //   var intId = '("#employee div").length + 1;'
  //   var fieldWrapper = '("<div class=\"fieldwrapper\" id=\"field" + intId + "\"/>");'
  //   var fName = '("<input type=\"text\" class=\"fieldname\" />");'
  //   var fType = '("<select class=\"fieldtype\"><option value=\"checkbox\">Checked</option><option value=\"textbox\">Text</option><option value=\"textarea\">Paragraph</option></select>");'
  //   var removeButton = '("<input type=\"button\" class=\"remove\" value=\"-\" />");'
    
  //   removeButton.click(function() {
  //     $(this).parent().remove();
  //   });

  //           fieldWrapper.append(fName);
  //           fieldWrapper.append(fType);
  //           fieldWrapper.append(removeButton);
  //           $("#buildyourform").append(fieldWrapper);
  //       });      
  //   });
  // }

}
