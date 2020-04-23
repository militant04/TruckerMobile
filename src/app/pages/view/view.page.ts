import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
@Component({
  selector: 'view',
  templateUrl: './view.page.html',
  styleUrls: ['./view.page.scss'],
})
export class ViewPage implements OnInit {
   userid:any;
   claimdata :any;
  constructor( private http: HttpClient) { }

  ngOnInit() {

    this.getClaims();
  }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  async getClaims(){

    if(localStorage.getItem("UsersId")!=null){
      this.userid = localStorage.getItem("UsersId")
    }
    this.http.get("http://integrator.dedicated.co.za/api/api/allClaims?clientID="+ this.userid )
      .subscribe(data =>  {

        if(data){
          console.log(data);
         this.claimdata =data;
        }
      }, error => {
        //this.presentAlert(error);
        console.log(error);
      });
  }

}
