import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonList, LoadingController, ModalController, ToastController, Config } from '@ionic/angular';

import { ScheduleFilterPage } from '../schedule-filter/schedule-filter';
import { ConferenceData } from '../../providers/conference-data';
import { UserData } from '../../providers/user-data';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { HTTP } from '@ionic-native/http/ngx';
import {Platform} from '@ionic/angular';

@Component({
  selector: 'page-schedule',
  templateUrl: 'schedule.html',
  styleUrls: ['./schedule.scss'],
})
export class SchedulePage implements OnInit {
  // Gets a reference to the list element
  @ViewChild('scheduleList', { static: true }) scheduleList: IonList;
  //API ="https://localhost:44333/api/";
  API ="http://integrator.dedicated.co.za/api/api/";
  ios: boolean;
  dayIndex = 0;
  queryText = '';
  segment = 'all';
  excludeTracks: any = [];
  shownSessions: any = [];
  groups: any = [];
  institutions: any = [];
  InstName:any;
  InstAddress:any;
  action:any;
  body:any;
  returnedData: any;
  android: any;
  confDate: string;
  private dynamicColor: string;
  email:any;
  phone:any;
  Date: any;


  constructor(
    public alertCtrl: AlertController,
    public confData: ConferenceData,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public router: Router,
    public toastCtrl: ToastController,
    public user: UserData,
    public config: Config,
    private http: HttpClient,
    private http2: HTTP,private platform: Platform
  ) {

    if(this.platform.is("android")){
      this.android = true;
    }

    this.dynamicColor = 'orange';
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': '*'
    })
  };
async setDetail(name,address, email, phonenumbers){
  localStorage.setItem("InstName" , name);
  localStorage.setItem("address" , address);
  localStorage.setItem("email" , email);
  localStorage.setItem("phonenumbers" , phonenumbers);

}



  async getItems(ev) {
    let val = ev.target.value;
    const loader = await this.loadingCtrl.create({
      message: 'Please Wait - Loading Institutions',
      // duration: 10000
    });
   // setTimeout(() =>  loader.present(), 2000);
    await loader.present();


    // let API = "http://130.61.122.112/api/api/institutions?instype="+instType;
    let API = this.API+'institutions?instname='+val;
    this.http.get(API )
      .subscribe(data => {
        console.log(data);
        //alert(data);
        this.institutions = data;
        loader.dismiss();


        if(data){
          // this.presentAlert("claim created successfully");
        }
      }, error => {
        alert(error.message);

        console.log(error);
        loader.dismiss();
      });

  }

  async  getInstitutions(instType) {
    const loading = await this.loadingCtrl.create({
      message: 'Please Wait - Loading Institutions',
      // duration: 10000
    });

    await loading.present();
    this.action ="LoanTracking?";
    this.body = "checkNumber=1";

   // let API = "http://130.61.122.112/api/api/institutions?instype="+instType;
    let API = this.API+'institutions?instype='+instType;
    this.http.get(API )
      .subscribe(data => {
        console.log(data);
        //alert(data);
        this.institutions = data;
        loading.dismiss();


        if(data){
         // this.presentAlert("claim created successfully");
        }
      }, error => {
        alert(error.message);

        console.log(error);
        loading.dismiss();
      });
  }

  ngOnInit() {

    this.email =localStorage.getItem("To" );
    this.phone = localStorage.getItem("From" );

    this.Date = new Date(localStorage.getItem('Date'));
   // this.getInstitutions();

  }










  async presentLoad() {
    const loading = await this.loadingCtrl.create({
      message: 'Getting List of Institutions',
    });
    await loading.present();

  }

}
