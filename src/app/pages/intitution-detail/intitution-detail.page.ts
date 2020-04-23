import { Component, OnInit } from '@angular/core';

import { AlertController } from '@ionic/angular';
import {Router} from '@angular/router';

@Component({

  selector: 'intitution-detail',
  templateUrl: './intitution-detail.page.html',
  styleUrls: ['./intitution-detail.page.scss'],

})
export class IntitutionDetailPage implements OnInit {
  amac:any;
  address:any;
  email:any;
  phone:any;
  amac2:any;
  TypeofTruck : any;
  TruckModel:any;
  Trailers:any;
  LeftHand:any;
  Comment:any;
  Date:any;


  constructor(public router: Router) { }

  ngOnInit() {
     this.amac2 ="Job From" +" "+localStorage.getItem("From" ) + " "+ "to"+" " +localStorage.getItem("To" );
     this.amac =localStorage.getItem('calcDist');
     this.address = localStorage.getItem('calcTime');
     this.email =localStorage.getItem("To" );
     this.phone = localStorage.getItem("From" );
  }

  saveValues(){
    localStorage.setItem('Type',this.TypeofTruck) ;

    localStorage.setItem('TruckModel',this.TruckModel) ;
    localStorage.setItem('Trailers',this.Trailers) ;
    localStorage.setItem('LeftHand',this.LeftHand) ;
    localStorage.setItem('Comment',this.Comment) ;
    localStorage.setItem('Date', this.Date)


    console.log(localStorage.getItem('LeftHand'));

    this.router.navigateByUrl('/app/tabs/schedule')
  }




}
