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
   window.cordova.plugins.GoogleApiPlugin.login({
      webClientId: '1801024296-2t6clh0bee1drtmb94odqu29degg4mns.apps.googleusercontent.com',
      offline: true,
      scopes:  'https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/drive.metadata'
    }, this.onLoginSuccess, this.onLoginError);
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
