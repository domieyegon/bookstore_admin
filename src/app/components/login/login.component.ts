import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../service/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public credential = {username : '' , password : ''};

  public loggedIn = false;

  constructor(private loginService: LoginService, private router : Router) { }

  onSubmit() {
    this.loginService.sendCredential(this.credential.username, this.credential.password).subscribe(
      res => {
        console.log(res);
        localStorage.setItem('xAuthToken', res.json().token);
        
        this.router.navigate(['/bookList']);
        this.loggedIn = true;
        location.reload();
      },
      error => {
        console.log(error);
      }
    );
  }

  ngOnInit() {

    this.loginService.checkSession().subscribe(

    res => {
      this.loggedIn = true;
    },
    err => {
      this.loggedIn = false;
    }
    );
  }

}
