import { Injectable } from '@angular/core';


@Injectable()
export class UserModel {
    protected terror: TypeError;
    protected _displayName: string = "";
    protected _email: String = "";
    protected _idToken: String = "";
    protected _serverAuthCode: String = "";
    protected _userId: String = "";
    protected _familyName: String = "";
    protected _givenName: String = "";
    protected _imageUrl: String = "";

    constructor(public signedUser: any, private userClient?: any) {
        if(signedUser != typeof Object || signedUser == null) {
            this.terror = new TypeError("first arg is not passed or Object type");
            throw this.terror;
        }
        this.setProperties(signedUser, (signedUser != null || false))
    }

    setProperties(data: any, hasAuthServer: Boolean) {     
        let property = "displayName"; 
        try {            
            this.displayName(data.displayName);
            property = "email";
            this.email(data.email);
            property ="idToken";
            this.idToken(data.idToken);
            property ="serverAuthCode";
            if(hasAuthServer) this.serverAuthCode(data.serverAuthCode);
            property ="userId";
            this.userId(data.userId);
            property ="familyName";
            this.familyName(data.familyName);
            property ="givenName";
            this.givenName(data.givenName);
            property ="imageUrl";
            this.imageUrl(data.imageUrl);
        }  catch(e) {
            throw new TypeError(`Failed to set Property: ${property}, Error message from core: ${e}`);
        }
    }

    //setters
    set displayName(name: any) {
        this._displayName = name;
    }

    set email(url: any) {
        this._email = url;
    }

    set idToken(token: any) {
        this._idToken = token;
    }

    set serverAuthCode(authToken: any) {
        this._serverAuthCode = authToken;
    }

    set userId(id: any) {
        this._userId = id;
    }

    set familyName(name: any) {
        this._familyName = name;
    }

    set givenName(name: any) {
        this._familyName = name;
    }
    
    set imageUrl(url: any) {
        this._imageUrl = url;
    }

    //getters
    get displayName():any {
        return this._displayName;
    }

    get email():any {
    return this._email;
    }

    get idToken():any {
    return this._idToken;
    }

    get serverAuthCode():any {
    return this._serverAuthCode;
    }

    get userId():any {
    return this._userId;
    }

    get familyName():any {
    return this._familyName;
    }

    get imageUrl():any {
    return this._imageUrl;
    }
    
    getJSONOfClass(): JSON {
        //return the whole class properties as an JSON Object
        let returnable: any;

        returnable = {
            displayName: this.displayName,
            email: this.email,
            idToken: this.idToken,
            userId: this.userId,
            familyName: this.familyName,
            imageUrl: this.imageUrl
        }
        if(this.serverAuthCode !== null) returnable.serverAuthCode = this.serverAuthCode
        
        return JSON.parse(returnable);
         
    }
}