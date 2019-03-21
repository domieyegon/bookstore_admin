import {Headers, Http } from '@angular/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class GetBookService {

  constructor(private http: Http) { }

  getBook(id: number) {

    const url = 'http://localhost:8181/book/' + id;
    const headers = new Headers ({
      'Content-Type': 'application/json',
      'x-auth-token' : localStorage.getItem('xAuthToken')
    });

    return this.http.get(url, {headers});
  }

}
