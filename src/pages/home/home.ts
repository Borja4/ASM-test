import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UserService } from '../../_service/user.service';

declare var window: any;
declare var cordovaHTTP: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public result: string ='no data';

  constructor(
    public navCtrl: NavController, 
    public service: UserService
  ) {}

 
  onLoginSuccess(res){
    console.log('result from Plugin ', res);   
    
   }

  onLoginError(error) {
    console.error('The error was: ', error);
  }
}
