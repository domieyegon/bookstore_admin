import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: Http) { }

  sendCredential(username: string, password: string) {

    const url = 'http://localhost:8181/token';

    // method for encripting the strings to base64
    const encodedCredentials = btoa(username + ':' + password);

    const basicHeader = 'Basic ' + encodedCredentials;

    const headers = new Headers ({
      'Content-Type' : 'application/x-www-form-urlencoded',
      Authorization : basicHeader
    });

    return this.http.get(url, {headers});

  }

  checkSession() {

    const url = 'http://localhost:8181/checkSession';
    const headers = new Headers ({
      'x-auth-token' : localStorage.getItem('xAuthToken')
    });

    return this.http.get(url, {headers});

  }

  logout() {

    const url = 'http://localhost:8181/user/logout';
    const headers = new Headers ({
      'x-auth-token' : localStorage.getItem('xAuthToken')
    });

    return this.http.post(url, '', {headers});

  }

}
