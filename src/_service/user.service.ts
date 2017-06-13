import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Constants } from '../_constants/constants';
import { SecureStorage, SecureStorageObject } from '@ionic-native/secure-storage';
import { UserModel } from '../_models/user.model';


declare var window: any; 
declare var cordovaHTTP: any;

@Injectable()
export class UserService {

    //UserModel
    private userLogged: UserModel;

    //identifiers
    private LOGIN_GOOGLE: String = "login";
    private VALIDATE_ACCOUNT: String = "validateAccount";

    //methods
    private REQUEST_METHOD_VALIDATION = "/oauth2/v3/tokeninfo";

    private identifierCall: String = "";
    private instancedStore: SecureStorageObject;

    constructor(private http: Http, private _constants: Constants, private securedStore: SecureStorage) { 
                this.securedStore.create('databucket').then((st) => {
            this.instancedStore = new SecureStorageObject(st);
            this.instancedStore.get('userInfo').then((user)=>{
               console.log("User already set");
            }, error => console.log('No user stored,'))
        }, (error)=> console.log('Error in instance of Secure storage. Error: ',error))
    }
    
    signInWithGoogle(success, reject) {
        this.identifierCall = this.LOGIN_GOOGLE;
        window.plugins.googleplus.login({
            webClientId:this._constants.getClientWebId,
            scope: this._constants.getDriveScopes
        }, success(this.onSuccessCallback), reject(this.onFailedCallback));
    }

    private constructRequestHTTPByMethodName(method: String): String {
        return `${this._constants.getGoogleURI}${method}`;
    }

    private onSuccessCallback(res) {
        if(this.identifierCall === this.LOGIN_GOOGLE){  
            this.userLogged = new UserModel(res);
            this.validateLoggedUser(res);  
        } else {
            throw new ReferenceError("No identifier registered for this call")
        }
    }

    private onFailedCallback(error) {
        console.log('Error por gestionar en user.service ', error);
    }

    private validateLoggedUser(user) {
        this.identifierCall = this.VALIDATE_ACCOUNT;
        this.sendHTTPRequest(this.constructRequestHTTPByMethodName(this.REQUEST_METHOD_VALIDATION),
            {
              id_token:  user.idToken
            }
            ,(res)=>{
            console.log("Resultado de la validacion. ", res);                    
            this.setSafeDataStorage(user, this.VALIDATE_ACCOUNT);
        }, (error) =>{
            console.log("Error validando. Se desconectara el usuario", error);
            window.plugins.googleplus.disconnect();

        });

    }

    private setSafeDataStorage(res, dataIndex) {
        if(dataIndex != typeof String || dataIndex == null) {
            console.log('No dataIndex is passed, we cannot know what you want to set.');
            return;
        }
        this.instancedStore.get('userInfo').then((data)=> {
            //exist information from user
            this.instancedStore.remove('userInfo')
            .then((result)=>{
                console.log('Information removed successfully ', result);
                this.instancedStore.set('userInfo', JSON.stringify(res)).then((resultToSet)=>{
                    console.log('Information from store updated. ', resultToSet);
                })
                .catch((error)=> console.log('Error updating user information from storage. ', error));
            })
            .catch((error)=> console.log('Error removing user information from storage. Error: ', error));
        }, error => console.log('error'));
    }

    private sendHTTPRequest(url, params=null, success, error){
        if(params == null) params = {};
        cordovaHTTP.get(url, params, success, error);
    }

}