import { Injectable } from '@angular/core';
import { AppConfig } from '../AppConfig'
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Device } from '@ionic-native/device';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { AlertController } from 'ionic-angular';
import { OneSignal } from '@ionic-native/onesignal';
import { DatePipe } from '@angular/common';
@Injectable()
export class TaProvider {

  uuid:any;
  play_id:any;
  public public_Header = new Headers();

  constructor(public http: Http,public alertCtrl: AlertController,private device: Device,private oneSignal: OneSignal,
    public datepipe: DatePipe) {
    console.log('Hello TaProvider Provider');

  }

declare_header(){
  
  this.public_Header.append('Content-Type', 'application/x-www-form-urlencoded');
  this.public_Header.append('Accept', 'application/json');
  this.public_Header.append('Authorization', 'Bearer '+localStorage.getItem('api_token'));
}

uuid_login(uuid:any){
  let myHeader = new Headers();
  myHeader.append('Content-Type', 'application/x-www-form-urlencoded');

  let _options = new RequestOptions({headers: myHeader});

  let _body = new URLSearchParams();
  _body.append("method","uuid_login")
  _body.append("uuid",uuid)

  let datas = this.http.post(AppConfig.API_ENDPOINT,_body,_options);
  return datas.map((res:Response) => res.json());
}

    upload(data:any){
      
              let myHeader = new Headers();
              myHeader.append('Content-Type', 'application/x-www-form-urlencoded');
      
              let _options = new RequestOptions({headers: myHeader});
      
              let _body = new URLSearchParams();
                _body.append("mobi_seqe",localStorage.getItem('mobi_seqe'))
                _body.append("data",data)
               console.log('Body: '+_body);
              return this.http.post(AppConfig.upload,_body,_options)
                .map((res:Response) => res.json().responseData)
                .catch(this.handleError);
        }


        up_lara(content:any){
      
          let myHeader = new Headers();
          myHeader.append('Content-Type', 'application/x-www-form-urlencoded');
  
          let _options = new RequestOptions({headers: myHeader});
  
          let _body = new URLSearchParams();
            _body.append("mobi_seqe",localStorage.getItem('mobi_seqe'))
            _body.append("content",content)
           console.log('Body: '+_body);
          return this.http.post(AppConfig.up_lara,_body,_options)
            .map((res:Response) => res.json().responseData)
            .catch(this.handleError);
    }


    register(recordData:any){
      
      this.uuid = localStorage.getItem('uuid');
      this.play_id = localStorage.getItem('play_id');

              let myHeader = new Headers();
              myHeader.append('Content-Type', 'application/x-www-form-urlencoded');
      
              let _options = new RequestOptions({headers: myHeader});
      
              let _body = new URLSearchParams();
                _body.append("mobi_token",recordData.mobi_token)
                _body.append("empl_emai",recordData.empl_emai)
                _body.append("mobi_hwid",this.uuid)
                _body.append("play_id",this.play_id)
               console.log('Body: '+_body);
              return this.http.post(AppConfig.REGISTER_API_V2,_body,_options)
                .map((res:Response) => res)
                .catch(this.handleError);
        }

        get_avatar(){
      
    
          let headers = new Headers();
          headers.append('Content-Type', 'application/x-www-form-urlencoded');
          headers.append('Accept', 'application/json');
          headers.append('Authorization', 'Bearer '+localStorage.getItem('api_token'));
          
                  let _options = new RequestOptions({headers: headers});
          
                  let _body = new URLSearchParams();
                  _body.append("mobi_seqe",localStorage.getItem('mobi_seqe'));

                   console.log('Body: '+_body);
                   let datas =  this.http.post(AppConfig.GET_AVATAR,_body,_options)
                    // .map((res:Response) => res.json())
                    // .catch(this.handleError);
                    return datas.map((res:Response) => res.json());
            }
    
        check_token(recordData:any){
    
                  let myHeader = new Headers();
                  myHeader.append('Content-Type', 'application/x-www-form-urlencoded');
          
                  let _options = new RequestOptions({headers: myHeader});
          
                  let _body = new URLSearchParams();
                    _body.append("mobi_token",recordData.mobi_token)
                    _body.append("empl_emai",recordData.empl_emai)
                    _body.append("password",recordData.password)
                   console.log('Body: '+_body);
                  return this.http.post(AppConfig.check_token,_body,_options)
                    .map((res:Response) => res.json())
                    .catch(this.handleError);
            }
    
        


  get_locations(recordData:any){
    
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Accept', 'application/json');
    headers.append('Authorization', 'Bearer '+localStorage.getItem('api_token'));

    let _options = new RequestOptions({headers: headers});
    
            let _body = new URLSearchParams();
              _body.append("method","location")
              _body.append("lat",recordData.lat)
              _body.append("lng",recordData.lng)
             console.log('Body: '+_body);
             let datas = this.http.post(AppConfig.API_ENDPOINT,_body,_options);
             return datas.map((res:Response) => res.json());
            // return this.http.post(AppConfig.API_ENDPOINT,_body,_options)
            //   .map((res:Response) => res.json().responseData)
            //   .catch(this.handleError);
      }

      request_payslip(period:any){
      
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        headers.append('Accept', 'application/json');
        headers.append('Authorization', 'Bearer '+localStorage.getItem('api_token'));
    
        let _options = new RequestOptions({headers: headers});

        let _body = new URLSearchParams();
          _body.append("mobi_seqe",localStorage.getItem('mobi_seqe'));
          _body.append("in_bound",period);
         console.log('Body: '+_body);
         let datas = this.http.post(AppConfig.REQUEST_PAYSLIP_API_V3,_body,_options)
         return datas.map((res:Response) => res.json());;
          // .map((res:Response) => res.json().responseData)
          // .catch(this.handleError);
  }

  request_user_info(input:any){
      
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Accept', 'application/json');
    headers.append('Authorization', 'Bearer '+localStorage.getItem('api_token'));

    let _options = new RequestOptions({headers: headers});
    let _body = new URLSearchParams();
      _body.append("mobi_seqe",localStorage.getItem('mobi_seqe'));
      _body.append("in_bound",input.in_bound);
      _body.append("profile",input.profile);
     console.log('Body: '+_body);
     let datas = this.http.post(AppConfig.REQUEST_USER_INFO_API_V3,_body,_options)
     return datas.map((res:Response) => res.json());;
      // .map((res:Response) => res.json().responseData)
      // .catch(this.handleError);
}


request_update_profile(input:any){
      
  let headers = new Headers();
  headers.append('Content-Type', 'application/x-www-form-urlencoded');
  headers.append('Accept', 'application/json');
  headers.append('Authorization', 'Bearer '+localStorage.getItem('api_token'));

  let _options = new RequestOptions({headers: headers});
  let _body = new URLSearchParams();

  _body.append("mobi_seqe",localStorage.getItem('mobi_seqe'));

  _body.append("empl_cdid",input[0].EMPL_CDID);
  _body.append("empl_txid",input[0].EMPL_TXID);
  _body.append("empl_scid",input[0].EMPL_SCID);
  _body.append("birt_date",input[0].BIRT_DATE);
  _body.append("hire_date",input[0].HIRE_DATE);
  _body.append("ppro_date",input[0].PPRO_DATE);
  _body.append("resi_date",input[0].RESI_DATE);
  _body.append("empl_sexx",input[0].EMPL_SEXX);

  _body.append("payr_grop",input[0].PAYR_GROP);
  _body.append("empl_code",input[0].EMPL_CODE);
  _body.append("tpre_name",input[0].TPRE_NAME);
  _body.append("tfst_name",input[0].TFST_NAME);
  _body.append("tlst_name",input[0].TLST_NAME);
  _body.append("epre_name",input[0].EPRE_NAME);
  _body.append("efst_name",input[0].EFST_NAME);
  _body.append("elst_name",input[0].ELST_NAME);

  _body.append("empl_mobi",input[0].EMPL_MOBI);
  _body.append("empl_emai",input[0].EMPL_EMAI);
  _body.append("empl_pho1",input[0].EMPL_PHO1);
  _body.append("empl_pho2",input[0].EMPL_PHO2);

  _body.append("empl_add1",input[0].EMPL_ADD1);
  _body.append("empl_add2",input[0].EMPL_ADD2);
  _body.append("empl_add3",input[0].EMPL_ADD3);
  _body.append("post_code",input[0].POST_CODE);

  _body.append("bank_code",input[0].BANK_CODE);
  _body.append("empl_acco",input[0].EMPL_ACCO);

   console.log('Body: '+_body);
   let datas = this.http.post(AppConfig.REQUEST_UPDATE_PROFILE_V3,_body,_options)
   return datas.map((res:Response) => res);
    // .map((res:Response) => res.json().responseData)
    // .catch(this.handleError);
}


//////////////////////// LEAVE Function //////////////////////////

get_leave(){ /// GET LEAVE TYPE ////
      
  let headers = new Headers();
  headers.append('Content-Type', 'application/x-www-form-urlencoded');
  headers.append('Accept', 'application/json');
  headers.append('Authorization', 'Bearer '+localStorage.getItem('api_token'));

  let _options = new RequestOptions({headers: headers});

  let _body = new URLSearchParams();
    _body.append("mobi_seqe",localStorage.getItem('mobi_seqe'));
    _body.append("in_bound",this.datepipe.transform(Date(), 'yyyyMMdd')+'|0');
   console.log('Body: '+_body);
   let datas = this.http.post(AppConfig.REQUEST_LEAVE_BALANCE_API_V3,_body,_options)
   return datas.map((res:Response) => res.json());;
    // .map((res:Response) => res.json().responseData)
    // .catch(this.handleError);
}


user_review_leave(input:any){ /// GET LEAVE STATUS ////
      
  let headers = new Headers();
  headers.append('Content-Type', 'application/x-www-form-urlencoded');
  headers.append('Accept', 'application/json');
  headers.append('Authorization', 'Bearer '+localStorage.getItem('api_token'));

  let _options = new RequestOptions({headers: headers});

  let _body = new URLSearchParams();
    _body.append("mobi_seqe",localStorage.getItem('mobi_seqe'));
    _body.append("from_date",input.from_date);
    _body.append("leav_stat",input.leav_stat);
    _body.append("leav_format",input.leav_format);
   console.log('Body: '+_body);
   let datas = this.http.post(AppConfig.REQUEST_LEAVE_REQUEST_STAT_V3,_body,_options)
   return datas.map((res:Response) => res.json());;
    // .map((res:Response) => res.json().responseData)
    // .catch(this.handleError);
}

get_leave_bal(input:any){  ///GET LEAVE BALANCE ///
      
  let headers = new Headers();
  headers.append('Content-Type', 'application/x-www-form-urlencoded');
  headers.append('Accept', 'application/json');
  headers.append('Authorization', 'Bearer '+localStorage.getItem('api_token'));

  let _options = new RequestOptions({headers: headers});

  let _body = new URLSearchParams();
    _body.append("mobi_seqe",localStorage.getItem('mobi_seqe'));
    _body.append("in_bound",this.datepipe.transform(Date(), 'yyyyMMdd')+'|1|'+input.SYST_CODE+'|'+input.LEAVE_CODE);
   console.log('Body: '+_body);
   let datas = this.http.post(AppConfig.REQUEST_LEAVE_BALANCE_API_V3,_body,_options)
   return datas.map((res:Response) => res.json());;
    // .map((res:Response) => res.json().responseData)
    // .catch(this.handleError);
}

// get_leave_request(){
      
//   let myHeader = new Headers();
//   myHeader.append('Content-Type', 'application/x-www-form-urlencoded');

//   let _options = new RequestOptions({headers: myHeader});

//   let _body = new URLSearchParams();
//     _body.append("mobi_seqe",localStorage.getItem('mobi_seqe'));
//     _body.append("in_bound",'20180221|0');
//    console.log('Body: '+_body);
//    let datas = this.http.post(AppConfig.REQUEST_LEAVE_REQUEST_API_V3,_body,_options)
//    return datas.map((res:Response) => res.json());;
//     // .map((res:Response) => res.json().responseData)
//     // .catch(this.handleError);
// }

request_leave_request(input:any){

  let headers = new Headers();
  headers.append('Content-Type', 'application/x-www-form-urlencoded');
  headers.append('Accept', 'application/json');
  headers.append('Authorization', 'Bearer '+localStorage.getItem('api_token'));

  let _options = new RequestOptions({headers: headers});

  let _body = new URLSearchParams();
    _body.append("mobi_seqe",localStorage.getItem('mobi_seqe'));
    _body.append("current_date",input.current_date);
    _body.append("status",input.status); // submit, cancel,approve ,reject,escalate,hold
    _body.append("approver",input.approver);
    _body.append("requ_seqe",input.requ_seqe);// if cancel
    _body.append("leave_code",input.leave_code);
    _body.append("leave_from",input.leave_from);
    _body.append("leave_to",input.leave_to);
    _body.append("time_from",input.time_from);
    _body.append("time_to",input.time_to);
    // _body.append("leave_hour",input.leave_hour);
    _body.append("noof_days",input.noof_days);
    _body.append("noof_hour",input.noof_hour);
    _body.append("half_dayy",input.half_dayy);
    _body.append("leave_note",input.leave_note);
   console.log('Body: '+_body);
   let datas = this.http.post(AppConfig.REQUEST_LEAVE_REQUEST_API_V3,_body,_options)
   return datas.map((res:Response) => res.json());
    // .map((res:Response) => res.json().responseData)
    // .catch(this.handleError);
}

cancel_leave_request(input:any){

  let headers = new Headers();
  headers.append('Content-Type', 'application/x-www-form-urlencoded');
  headers.append('Accept', 'application/json');
  headers.append('Authorization', 'Bearer '+localStorage.getItem('api_token'));

  let _options = new RequestOptions({headers: headers});

  let _body = new URLSearchParams();
    _body.append("mobi_seqe",localStorage.getItem('mobi_seqe'));
    _body.append("current_date",input.current_date);
    _body.append("status",'8'); // submit, cancel,approve ,reject,escalate,hold
    _body.append("approver",input.approver);
    _body.append("requ_seqe",input.REQU_SEQE);// if cancel
    _body.append("leave_code",input.SYST_CODE);
    _body.append("leave_from",input.LEAV_FROM);
    _body.append("leave_to",input.LEAV_TO);
    _body.append("time_from",input.time_from);
    _body.append("time_to",input.time_to);
    // _body.append("leave_hour",input.leave_hour);
    _body.append("noof_days",input.NOOF_DAYS);
    _body.append("noof_hour",input.NOOF_HOUR);
    _body.append("half_dayy",input.half_dayy);
    _body.append("leave_note",input.leave_note);
   console.log('Body: '+_body);
   let datas = this.http.post(AppConfig.REQUEST_CANCEL_LEAVE_REQUEST_V3,_body,_options)
   return datas.map((res:Response) => res.json().responseData);
    // .map((res:Response) => res.json().responseData)
    // .catch(this.handleError);
}

review_leave_request(){
 
  let headers = new Headers();
  headers.append('Content-Type', 'application/x-www-form-urlencoded');
  headers.append('Accept', 'application/json');
  headers.append('Authorization', 'Bearer '+localStorage.getItem('api_token'));

  let _options = new RequestOptions({headers: headers});

  let _body = new URLSearchParams();
    _body.append("mobi_seqe",localStorage.getItem('mobi_seqe'));
   console.log('Body: '+_body);
   let datas = this.http.post(AppConfig.REQUEST_REVIEW_LEAVE_REQUEST_V3,_body,_options)
   return datas.map((res:Response) => res.json());
    // .map((res:Response) => res.json().responseData)
    // .catch(this.handleError);
}

approve_leave_request(input:any){
  
  let headers = new Headers();
  headers.append('Content-Type', 'application/x-www-form-urlencoded');
  headers.append('Accept', 'application/json');
  headers.append('Authorization', 'Bearer '+localStorage.getItem('api_token'));

  let _options = new RequestOptions({headers: headers});
  let _body = new URLSearchParams();
    _body.append("mobi_seqe",localStorage.getItem('mobi_seqe'));
    _body.append("in_bound",'|0|1|'+input.REQU_SEQE+'|'+input.APPV_FLAG+'|'+input.APPV_NOTE+'|<<#1>>||'); // SHORT FORMAT | APPROVER 1
   console.log('Body: '+_body);
   let datas = this.http.post(AppConfig.REQUEST_APPROVE_LEAVE_REQUEST_V3,_body,_options)
   return datas.map((res:Response) => res.json());
    // .map((res:Response) => res.json().responseData)
    // .catch(this.handleError);
}

///////////////////////////// END LEave Function /////////////////////////////////


//////////////////// START OT Function ///////////////////////////


request_ot_request(input:any){
      
  let headers = new Headers();
  headers.append('Content-Type', 'application/x-www-form-urlencoded');
  headers.append('Accept', 'application/json');
  headers.append('Authorization', 'Bearer '+localStorage.getItem('api_token'));

  let _options = new RequestOptions({headers: headers});

  let _body = new URLSearchParams();
    _body.append("mobi_seqe",localStorage.getItem('mobi_seqe'));
    _body.append("otim_date",input.otim_date);
    _body.append("time_from",input.time_from);
    _body.append("time_to",input.time_to);
    _body.append("requ_hour",input.requ_hour); 
    _body.append("requ_amnt",input.requ_amnt);
    _body.append("otim_note",input.otim_note);
   console.log('Body: '+_body);
   let datas = this.http.post(AppConfig.REQUEST_OT_REQUEST_API_V3,_body,_options)
   return datas.map((res:Response) => res.json());
          // return this.http.post(AppConfig.REQUEST_OT_REQUEST_API_V3,_body,_options)
          //   .map((res:Response) => res.json().responseData)
          //   .catch(this.handleError);
    }



    user_review_ot(input:any){ /// GET OT STATUS ////
      
      let headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      headers.append('Accept', 'application/json');
      headers.append('Authorization', 'Bearer '+localStorage.getItem('api_token'));
  
      let _options = new RequestOptions({headers: headers});
    
      let _body = new URLSearchParams();
        _body.append("mobi_seqe",localStorage.getItem('mobi_seqe'));
        _body.append("from_date",input.from_date);
        _body.append("ot_stat",input.ot_stat);
        _body.append("ot_format",input.ot_format);
       console.log('Body: '+_body);
       let datas = this.http.post(AppConfig.REQUEST_OT_REQUEST_STAT_V3,_body,_options)
       return datas.map((res:Response) => res.json());
        // .map((res:Response) => res.json().responseData)
        // .catch(this.handleError);
    }

    review_ot_request(){
      
      let headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      headers.append('Accept', 'application/json');
      headers.append('Authorization', 'Bearer '+localStorage.getItem('api_token'));
  
      let _options = new RequestOptions({headers: headers});
    
      let _body = new URLSearchParams();
        _body.append("mobi_seqe",localStorage.getItem('mobi_seqe'));
       console.log('Body: '+_body);
       let datas = this.http.post(AppConfig.REQUEST_REVIEW_OT_REQUEST_V3,_body,_options)
       return datas.map((res:Response) => res.json());
        // .map((res:Response) => res.json().responseData)
        // .catch(this.handleError);
    }



    approve_ot_request(input:any){
      
      let headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      headers.append('Accept', 'application/json');
      headers.append('Authorization', 'Bearer '+localStorage.getItem('api_token'));
  
      let _options = new RequestOptions({headers: headers});
    
      let _body = new URLSearchParams();
        _body.append("mobi_seqe",localStorage.getItem('mobi_seqe'));
        _body.append("in_bound",'|0|1|'+input.REQU_SEQE+'|'+input.OTIM_HOUR+'|'+input.OTIM_AMNT+'|'+input.APPV_FLAG+'|'+input.APPV_NOTE+'|<<#1>>||'); // SHORT FORMAT | APPROVER 1
       console.log('Body: '+_body);
       let datas = this.http.post(AppConfig.REQUEST_APPROVE_OT_REQUEST_V3,_body,_options)
       return datas.map((res:Response) => res.json());
        // .map((res:Response) => res.json().responseData)
        // .catch(this.handleError);
    }


   //////////////////// START OT Function ///////////////////////////


cancel_ot_request(input:any){
      
  let headers = new Headers();
  headers.append('Content-Type', 'application/x-www-form-urlencoded');
  headers.append('Accept', 'application/json');
  headers.append('Authorization', 'Bearer '+localStorage.getItem('api_token'));

  let _options = new RequestOptions({headers: headers});

  let _body = new URLSearchParams();
    _body.append("mobi_seqe",localStorage.getItem('mobi_seqe'));
    _body.append("otim_date",input.OTIM_DATE);
    _body.append("requ_hour",input.REQU_HOUR); 
    _body.append("requ_seqe",input.REQU_SEQE); // submit, cancel,approve ,reject,escalate,hold
    _body.append("status",'8'); // submit, cancel,approve ,reject,escalate,hold
    // _body.append("requ_amnt",input.requ_amnt);
    // _body.append("otim_note",input.otim_note);
   console.log('Body: '+_body);
   let datas = this.http.post(AppConfig.REQUEST_CANCEL_OT_REQUEST_V3,_body,_options)
   return datas.map((res:Response) => res.json());
          // return this.http.post(AppConfig.REQUEST_OT_REQUEST_API_V3,_body,_options)
          //   .map((res:Response) => res.json().responseData)
          //   .catch(this.handleError);
    }

//////////////////////////////// END OT Function //////////////////////////////////    


  login(input:any){
    this.uuid = localStorage.getItem('uuid');
    this.play_id = localStorage.getItem('play_id');

    let myHeader = new Headers();
    myHeader.append('Content-Type', 'application/x-www-form-urlencoded');
  
    let _options = new RequestOptions({headers: myHeader});
    let _body = new URLSearchParams();
    _body.append("mobi_emai",input.mobi_emai);
    _body.append("mobi_auth",input.mobi_auth);
    _body.append("mobi_hwid",this.uuid)
    _body.append("mobi_token",this.play_id)

    let datas = this.http.post(AppConfig.LOGIN_API_V2,_body,_options);
    return datas.map((res:Response) => res.json());
  }


  laravel_login(input:any){
    this.uuid = localStorage.getItem('uuid');
    this.play_id = localStorage.getItem('play_id');

    let myHeader = new Headers();
    myHeader.append('Content-Type', 'application/x-www-form-urlencoded');
  
    let _options = new RequestOptions({headers: myHeader});
    let _body = new URLSearchParams();
    _body.append("mobi_emai",input.mobi_emai);
    _body.append("mobi_auth",input.mobi_auth);
    _body.append("mobi_hwid",this.uuid)
    _body.append("mobi_token",this.play_id)

    let datas = this.http.post(AppConfig.DOMAIN+'/mobile_payroll/public/api/login',_body,_options);
    return datas.map((res:Response) => res.json());
  }


  private handleError(error:any){
      return Observable.throw(error.json().errorMessage||'Error from server!');
  }


}
