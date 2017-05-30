import { Injectable } from '@angular/core';
import { Http, RequestOptions, URLSearchParams } from '@angular/http';
 
 
@Injectable()
export class UserService {
    constructor(private http: Http) { }
 
    // getAll() {
    //     return this.http.get('https://developers.google.com/drive/v3/reference/files/',
    //      this.jwt()).map((response: Response) => response.json());
    // }
 
    public getAuth0() {
        return this.http.post('https://accounts.google.com/o/oauth2/v2/auth',null, this.oAuth2Header())
        .subscribe((response) => console.log('data ',response), (error) => console.log('error ',error), () => {
            console.log('completed!');
        });
        
    }
 
    // private helper methods AIzaSyCOuSJuBU0A1xWFtgjOZ_7hCZaTIGxFnIE
    private oAuth2Header() {
        // let headers = new Headers({
        //     client_id: '1801024296-2t6clh0bee1drtmb94odqu29degg4mns.apps.googleusercontent.com',
        //     redirect_uri:'https://api.ionic.io/auth/integrations/google?app_id=611e9d90',
        //   //  response_type: 'code',
        //     scope: 'https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/drive.metadata',
        // });
        let params = new URLSearchParams();
        params.append('client_id', '1801024296-2t6clh0bee1drtmb94odqu29degg4mns.apps.googleusercontent.com');
        params.append('redirect_uri', 'https://api.ionic.io/auth/integrations/google?app_id=611e9d90');
        params.append('response_type', 'code');
        params.append('scope', 'https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/drive.metadata');
        

        return new RequestOptions({ params: params });
    }
    // private jwt(authentification: string) {
    //     // create authorization header with jwt token
    //     // let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    //     // if (currentUser && currentUser.token) {
    //     //     let headers = new Headers({ 'Authorization':  });
    //     //     return new RequestOptions({ headers: headers });
    //     // }
    //     // let headers = new Headers({ 'key':'AIzaSyCOuSJuBU0A1xWFtgjOZ_7hCZaTIGxFnIE' });
    //     let headers = new Headers({ 'Authorization': 'Bearer ' + authentification });
    //     return new RequestOptions({ headers: headers });
    // }
}