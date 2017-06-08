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
  private user: any;

  constructor(
    public navCtrl: NavController, 
    public service: UserService
  ) {}
  login(){
   window.plugins.googleplus.login({
      webClientId: '106721698617-phf7lndv4piiflekl7tsrk2la5m0nak5.apps.googleusercontent.com',
      scope: 'https://www.googleapis.com/auth/drive.readonly https://www.googleapis.com/auth/drive.metadata.readonly'
    }, this.onLoginSuccess, this.onLoginError);
  }

  logout() {
    window.plugins.googleplus.logout((msg)=> console.log('logout response ', msg));
  }

  onLoginSuccess(res){
    console.log('result from Plugin ', res);
   
    let token = res.idToken;
    token = `Bearer ${token}`;

     cordovaHTTP.get("https://www.googleapis.com/oauth2/v3/tokeninfo", 
            {
              id_token:  res.idToken
            },
            {      
            }, function(response) {
                console.log('validate ',response);
                cordovaHTTP.get("https://www.googleapis.com/drive/v3/files", 
                {
                  access_token: res.idToken
                }, function(response) {
                    console.log('files ', response);
                }, function(response) {
                    console.error('error files ',response.error);
                  

                }
              );
            }, function(response) {
                console.error('error validate ',response.error);
            }
          );
    //  cordovaHTTP.get("https://www.googleapis.com/oauth2/v4/token", 
    //   {
    //     code: res.idToken,
    //     client_id: '106721698617-phf7lndv4piiflekl7tsrk2la5m0nak5.apps.googleusercontent.com',
    //     redirect_uri: 'https://api.ionic.io/auth/integrations/google?app_id=611e9d90',
    //     grant_type: ,
    //     code_verifier: res.idToken,
    //   },
    //   {
    //     Authorization: token,
    //   }, function(response) {
    //       console.log(response);
    //   }, function(response) {
    //       console.error(response.error);
    //   }
    // );
   }

   validate(user = this.user) {
     console.log('user ', this.user);

      cordovaHTTP.get("https://www.googleapis.com/drive/v3/files", 
      {
        access_token: user.idToken
      },
      {      
      }, function(response) {
          console.log(response);
      }, function(response) {
          console.error(response.error);
      }
    );
   }

   files(res) {
        
   }
  onLoginError(error) {
    console.error('The error was: ', error);
  }
  disconnect() {
    window.plugins.googleplus.disconnect();
    
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
