import { Component, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { UserData } from '../../providers/user-data';

import { UserOptions } from '../../interfaces/user-options';
import { HTTP } from '@ionic-native/http/ngx';
import { AlertController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Storage} from '@ionic/storage';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
  styleUrls: ['./signup.scss'],
})
export class SignupPage {

  signup: UserOptions = { username: '', password: '' };
  submitted = false;
  signupOption :any;
  FullNames="";
  Country="";
  PasswordUsed="";
  Mail="";
  DateOfBirth="";
  CellPhoneNumber="";
  Title="";
  Initial="";
  FirstName="";
  MiddleName="";
  Surname="";
  Address="";
  PasswordUsed2="";
  PassMessage="";
  individual:any;
  company:any;


  constructor(
    public router: Router,public loadingController: LoadingController,private storage: Storage,
    public userData: UserData,public alertController: AlertController,private http: HttpClient
  ) {

    this.signupOption =false;
  }

  onSignup(form: NgForm) {
    this.submitted = true;

    if (form.valid) {
      this.userData.signup(this.signup.username);
      this.router.navigateByUrl('/app/tabs/schedule');
    }
  }




  async presentAlert(message) {
    const alert = await this.alertController.create({
      header: 'Signup',
      message: message,
      buttons: [
        {
          text: 'Done',
          role: 'cancel'
        }, {
          text: 'Go To Login',
          handler: () => {
            this.gotoLogin();
          }
        }
      ]
    });

    await alert.present();
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  ionViewDidEnter() {

  }
  gotoLogin(){
    this.router.navigateByUrl('/login');
  }

  async sendPostRequest() {

    if(this.FullNames.length< 1){
      this.presentAlert("We need to know your name , please enter it");
      return ;
    }
    if(this.PasswordUsed.length< 1){
      this.presentAlert("Enter A Password");
      return;
    }
    if(this.PasswordUsed2.length< 1){
      this.presentAlert("Repeat the password you entered");
      return;
    }
    if(this.PasswordUsed == this.PasswordUsed2){

    }else{
      this.PassMessage ="Passwords do not match";
      return ;
    }
   const loading = await this.loadingController.create({
       message: 'Creating User - Please Wait',
      duration: 4000

    });

    await loading.present();
    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );

    let PostString = "FullName=" +this.FullNames+
      "&Country=Ghana" +
      "&PasswordUsed=" +this.PasswordUsed+
      "&eMail=" +this.Mail+
      "&DateOfBirth=04/08/1994"+
      "&CellPhoneNumber=" +this.CellPhoneNumber+
      "&Title= n/A" +
      "&Initial=" +this.FullNames+
      "&FirstName=" +this.FullNames+
      "&MiddleName=" +this.FullNames+
      "&Surname=" +this.Surname+
      "&Address="+this.Address;





    this.http.post(this.userData.API+"signup?"+PostString , {}, this.httpOptions)
      .subscribe(data =>  {
        console.log(data);
        console.log(data['_body']);

        if(data){

          this.storage.set("username", this.FullNames);
          this.storage.set("password", this.PasswordUsed);
          loading.dismiss();
          let res =JSON.stringify(data);
          this.presentAlert("User Created Succesfully - Proceed to Login Page");
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

  marked(ev){
   this.signupOption=true;
    console.log(ev.detail.value);
    let val = ev.detail.value;
    if(val =='Individual'){
      this.individual =true;
    }
    else{
      this.company =true;
    }

  }

}
