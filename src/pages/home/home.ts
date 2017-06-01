import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UserService } from '../../_service/user.service';

declare var window: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(
    public navCtrl: NavController, 
    public service: UserService
  ) {}

  login(){
    console.log('TypeScript from login');
   window.cordova.plugins.GoogleApiPlugin.login([{
      webClientId: '106721698617-phf7lndv4piiflekl7tsrk2la5m0nak5.apps.googleusercontent.com',
      offline: true,
      scopes:  'https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/drive.metadata https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/drive.appfolder'
    }], this.onLoginSuccess, this.onLoginError);
  }

  getThings() {
    console.log('TypeScript getThings');
    window.cordova.plugins.GoogleApiPlugin.driveLogin([{},this.onLoginSuccess,this.onLoginError]);
  }

  onLoginSuccess(res){
      console.log('result from Plugin ', res);
  }

  onLoginError(error) {
    console.error('The error was: ', error);
  }

  // logout(){
  //   this.gp.logout()
  //   .then(res => console.log('res ', res))
  //   .catch(error => console.log('error ', error));
  // }
  // disconnect(){
  //   this.gp.disconnect()
  //   .then(res => console.log('res ', res))
  //   .catch(error => console.log('error ', error));
  // }
}
