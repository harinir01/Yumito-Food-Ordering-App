import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGuard } from '../service/authguard.guard';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  userName: string = '';
  isLoggedIn: boolean = false;
  constructor(private loginService: LoginService) {

  }
  ngOnInit() {
    this.getLogInDetails();
  }
  getLogInDetails() {
    if (this.loginService.getLogInDetails()==true) {
      console.log(this.loginService.getLogInDetails())
      this.isLoggedIn = true
    }
    return this.isLoggedIn;
  }
  logOut() {
    this.isLoggedIn=false;
  }
}
