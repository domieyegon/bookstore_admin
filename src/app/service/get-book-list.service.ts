import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetBookListService {

  constructor(private http: Http) { }

  getBookList() {
    const url = 'http://localhost:8181/book/bookList';
    const headers = new Headers ({
      'Content-Type': 'application/json',
      'x-auth-token' : localStorage.getItem('xAuthToken')
    });

    return this.http.get(url, {headers});
  }

}
