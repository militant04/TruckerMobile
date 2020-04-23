import {Component, NgZone, ViewEncapsulation} from '@angular/core';
import { Router } from '@angular/router';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ActionSheetController } from '@ionic/angular';

import { ConferenceData } from '../../providers/conference-data';
import { HTTP } from '@ionic-native/http/ngx';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';

import {AfterViewInit, ElementRef, OnInit, ViewChild} from '@angular/core';


import { Platform } from '@ionic/angular';
import {Session} from 'inspector';
declare var google;


// @ts-ignore
let viewChild = ViewChild('mapElement');

@Component({
  selector: 'page-speaker-list',
  templateUrl: 'speaker-list.html',
  styleUrls: ['./speaker-list.scss'],
})

export class SpeakerListPage  implements OnInit, AfterViewInit {

  @viewChild mapNativeElement: ElementRef;

  speakers: any[] = [];
  claimname: any;
  next: boolean =false;
  ClientID :any;

  fromText:any;

  CalculatedDistance: any;
  EstimatedTime: any;
  PaymentMethod: any;



  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;

  GoogleAutocomplete: google.maps.places.AutocompleteService;
  autocomplete: { input: string; };
  autocompleteItems: any[];

  autocomplete1: { input: string; };
  autocompleteItems1: any[];
  location: any;
  placeid: any;
  from: any;
  to: any;


  // @ts-ignore
  @ViewChild('map') mapElement: ElementRef;
  // @ts-ignore
  @ViewChild('directionsPanel') directionsPanel: ElementRef;
  map: any;
  constructor(
    public actionSheetCtrl: ActionSheetController,
    public confData: ConferenceData,
    public inAppBrowser: InAppBrowser,
    public router: Router,public loadingController: LoadingController,
    private http: HttpClient, public zone: NgZone,



    public alertController: AlertController
  ) {
    this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
    this.autocomplete = { input: '' };
    this.autocompleteItems = [];
    this.autocomplete1 = { input: '' };
    this.autocompleteItems1 = [];

  }

  async presentAlert(message) {
    const alert = await this.alertController.create({
      header: 'New Job',
      message: message,
      buttons: [
        {
          text: 'Zvaita',
          role: 'cancel'
        }
        // , {
        //   text: 'View Claims',
        //   handler: () => {
        //     this.gotoClaims();
        //   }
        //}
      ]
    });

    await alert.present();
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  gotoClaims(){
    this.router.navigateByUrl('/view');
  }

  ionViewDidLoad() {
    this.loadMap();
    this.startNavigating();
  }

  loadMap(){

    let latLng = new google.maps.LatLng(-34.9290, 138.6010);

    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

  }

  startNavigating(){

    let directionsService = new google.maps.DirectionsService;
    let directionsDisplay = new google.maps.DirectionsRenderer;

    directionsDisplay.setMap(this.map);
    directionsDisplay.setPanel(this.directionsPanel.nativeElement);

    directionsService.route({
      origin: 'adelaide',
      destination: 'adelaide oval',
      travelMode: google.maps.TravelMode['DRIVING']
    }, (res, status) => {

      if(status == google.maps.DirectionsStatus.OK){
        directionsDisplay.setDirections(res);
      } else {
        console.warn(status);
      }

    });

  }

  async sendPostRequest() {
    const loading = await this.loadingController.create({
      message: 'Creating Claim Record',
      duration: 4000

    });





    await loading.present();
    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );


    if(localStorage.getItem("UsersId")!=null){
      this.ClientID = localStorage.getItem("UsersId")
    }

    let PostString = "ClientID="+this.ClientID+
      "&DepositRegister_ID=21" +
      "&InstitutionID=12" +
      "&ClaimDate=12/09/1994&" +
      "ClaimChannel=Mobile" +
      "&ClaimStatus=1" +
      "&ContactPerson=" +this.claimname+
      "&ContactPhoneNumber=1" +
      "&BankSpecificCIN=123" +
      "&CustomerType=1213" +
      "&Verifier=1" +
      "&VerifyDate=12/09/1994" +
      "&InsuredAmount=23" +
      "&UnInsuredAmount=121" +
      "&Address=1eeq" +
      "&PaymentMethod=" +this.PaymentMethod+
      "&MobileForeWalletPayment=wdqd";



    this.http.post("http://integrator.dedicated.co.za/api/api/claims?"+PostString , {}, this.httpOptions)
      .subscribe(data =>  {
        console.log(data);
        console.log(data['_body']);

        if(data){
          loading.dismiss();
          this.presentAlert("claim created successfully");
        }
      }, error => {
        loading.dismiss();
        this.presentAlert(error);
        console.log(error);
      });



    // this.http.post("http://130.61.122.112/api/api/claims?"+PostString , {}, this.httpOptions).map(res => res.json()).subscribe(data => {
    //   console.log(data);
    //  // loader.dismiss();
    //   //this.returnedData = data;
    //   //set values after search
    //
    // });
  }
  ngOnInit() {


  }

  ngAfterViewInit(): void {
    const map = new google.maps.Map(this.mapNativeElement.nativeElement, {
      zoom: 7,
      center: {lat: 41.85, lng: -87.65}
    });
    this.directionsDisplay.setMap(map);
  }

  calculateAndDisplayRoute() {
    const that = this;
    this.calculateDistance(this.from, this.to);
    this.directionsService.route({
      origin: this.from,
      destination:this.to,
      travelMode: 'DRIVING'
    }, (response, status) => {
      if (status === 'OK') {
        that.directionsDisplay.setDirections(response);
        this.next = true;
      } else {
        this.presentAlert("Directions request failed due to " + status +"Please specify existing destination and starting location");

      }
    });

    localStorage.setItem('To',this.to);
    localStorage.setItem('From', this.from);
  }




  async calculateDistance(from ,to) {
    const loading = await this.loadingController.create({
      message: 'Calculating..'
      //duration: 3000

    });

    await loading.present();
    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );


    let PostString = "Harare,ZW&destinations=Mutare,ZW";
    let APIKey = "AIzaSyCaBPYC95ll2VmdU94xgOXtew661CWsXKU";


    let origin2 = from;
    let destinationA = to;


    let service = new google.maps.DistanceMatrixService();
    service.getDistanceMatrix(
      {
        origins: [ origin2],
        destinations: [destinationA],
        travelMode: 'DRIVING'

      }, callback);
    await loading.dismiss();
    function callback(response, status) {
      // See Parsing the Results for

      console.log(response);


      if (status == 'OK') {

        let origins = response.originAddresses;
        let destinations = response.destinationAddresses;

        for (let i = 0; i < origins.length; i++) {
          let results = response.rows[i].elements;
          for (let j = 0; j < results.length; j++) {
            let element = results[j];
            let distance = element.distance.text;
            localStorage.setItem('calcDist' ,distance);

            console.log(distance);
            let duration = element.duration.text;
            localStorage.setItem('calcTime' ,duration);
            console.log(duration);
            let from = origins[i];
            let to = destinations[j];
          }
        }
        //this.CalculatedDistance = localStorage.getItem('calcDist');
      }
     // this.CalculatedDistance = localStorage.getItem('calcDist');
      // the basics of a callback function.
      this.CalculatedDistance = localStorage.getItem('calcDist');
      this.loading.dismiss();
    }
    this.CalculatedDistance = localStorage.getItem('calcDist');
    this.EstimatedTime =localStorage.getItem('calcTime');
    console.log("Tocky"+this.CalculatedDistance )

  }


  nextSteps(){
    this.router.navigateByUrl('/intitution-detail');
  }


  fromResults(){
    if (this.to == '' ) {
      this.autocompleteItems = [];
      console.log('1')
      return;
    }
    this.fromText='to';
    this.GoogleAutocomplete.getPlacePredictions({ input: this.to },
      (predictions, status) => {
        this.autocompleteItems = [];
        console.log('2' + status)
        this.zone.run(() => {
          predictions.forEach((prediction) => {
            console.log('3')
            this.autocompleteItems.push(prediction);
          });
        });
      });
  }
  updateSearchResults(from){


      if (this.from == '' ) {
        this.autocompleteItems = [];
        return;
      }
       this.fromText='from';
      this.GoogleAutocomplete.getPlacePredictions({ input: this.from },
        (predictions, status) => {
          this.autocompleteItems = [];
          this.zone.run(() => {
            predictions.forEach((prediction) => {
              this.autocompleteItems.push(prediction);
            });
          });
        });




}
  selectSearchResult(item) {
    console.log(item);
    this.location = item;
    this.placeid = this.location.place_id;
    console.log('placeid'+ this.placeid);
    if(this.fromText =='from'){
      this.from = this.location.description;
    }
    if(this.fromText =='to'){
      this.to = this.location.description;
    }
    //this.from = this.location.description;
    this.autocompleteItems.length = 0;
  }
  selectSearchResult1(item) {
    console.log(item);
    this.location = item;
    this.placeid = this.location.place_id;
    console.log('placeid'+ this.placeid);
    this.to = this.location.description;
    this.autocompleteItems1.length = 0;
  }
  GoTo(){
    return window.location.href = 'https://www.google.com/maps/place/?q=place_id:'+this.placeid;
  }





}
