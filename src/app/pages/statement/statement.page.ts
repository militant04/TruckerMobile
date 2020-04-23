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
  selector: 'statement',
  templateUrl: './statement.page.html',
  styleUrls: ['./statement.page.scss'],
})
export class StatementPage implements OnInit {
  API ="http://130.61.122.112/api/api/";
  institutions: any = [];
  dateto:any;
  datefrom:any;
  constructor(public alertCtrl: AlertController,
              public confData: ConferenceData,
              public loadingCtrl: LoadingController,
              public modalCtrl: ModalController,
              public router: Router,
              public toastCtrl: ToastController,
              public user: UserData,
              public config: Config,
              private http: HttpClient,
              private http2: HTTP,private platform: Platform) { }

  ngOnInit() {
  }


  async  getInstitutions() {
    const loading = await this.loadingCtrl.create({
      message: 'Getting your statement',
      // duration: 10000
    });

    await loading.present();

    let API = this.API+'Statement?Identity=1&DateFrom='+this.datefrom+'&DateTo='+this.dateto;
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

}
