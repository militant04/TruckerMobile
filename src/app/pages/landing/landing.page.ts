
import { Component, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserData } from '../../providers/user-data';
import { UserOptions } from '../../interfaces/user-options';
import { AlertController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { HTTP } from '@ionic-native/http/ngx';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';
import{ Storage} from '@ionic/storage';

@Component({
  selector: 'landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class  LandingPage {
  //private faio: FingerprintAIO
  //API ="https://localhost:44333/api/";
  API ="http://integrator.dedicated.co.za/api/api/";
  login: UserOptions = { username: '', password: '' };
  submitted = false;
  LoggedInData:any;
  email:any;
  password: any;

  constructor(
    public userData: UserData,
    public loadingController: LoadingController,
    private httpnat: HTTP,
    private faio: FingerprintAIO,private storage: Storage,
    public router: Router,public alertController: AlertController,private http: HttpClient
  ) { }

  async presentAlert( message) {
    const alert = await this.alertController.create({
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentLoading() {

    const loading = await this.loadingController.create({
      message: 'Please Wait',
      duration: 4000

    });

    await loading.present();

    const { role, data } = await loading.onDidDismiss();

    console.log('Loading dismissed!');
  }
  onLogin(form: NgForm) {
    this.presentLoading()
    setTimeout(() => this.router.navigateByUrl('/app/tabs/schedule'), 5000);
  }


  async  loginClick() {
    const loader = await this.loadingController.create({
      message: 'Setting Up ... Please Wait',
      duration: 5000
    });





    await loader.present();

    localStorage.setItem("UsersId", "1");
    localStorage.setItem("FullName", "Militant");
    setTimeout(() => this.router.navigateByUrl('/homepaage'), 1000);
    await loader.dismiss();

  }

  onSignup() {

    this.router.navigateByUrl('/signup');
  }

  async getData() {
    const loaderr = await this.loadingController.create({
      message: 'Setting Up ... Please Wait',
      duration: 5000
    });
    this.httpnat.get(this.API+'Login?userName='+this.email+'&passWord='+this.password, {}, {})
      .then(data => {

        console.log(data.status);
        console.log(data.data); // data received by server
        console.log(data.headers);

        this.LoggedInData = data;

        if(this.LoggedInData.Success == true){
          loaderr.dismiss();
          localStorage.setItem("UsersId", this.LoggedInData.UsersId);
          localStorage.setItem("FullName", this.LoggedInData.FullName);
          setTimeout(() => this.router.navigateByUrl('/homepaage'), 1000);

        }
        else{
          loaderr.dismiss();
          this.presentAlert( "Login Failed")
        }

      })
      .catch(error => {

        console.log(error.status);
        console.log(error.error); // error message as string
        console.log(error.headers);

        alert(error.status+ " "+error.error+" "+ error.headers);



        console.log(error);
        loaderr.dismiss();

      });
  }

  async fingerPrintLogin(){


    if( localStorage.getItem("FullName") != null){
      this.faio.show({
      })
        .then((result: any) =>
          this.router.navigateByUrl('/homepaage')
        )
        .catch((error: any) => console.log(error));
    }
    else{

      this.presentAlert("Fingerprint log in will work after the first login")

    }

  }

  async goToMember(){
    this.router.navigateByUrl('/auth');
  }


}

