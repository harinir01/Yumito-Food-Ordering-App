import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  error: string = '';
  isSubmitted: boolean = false;
  loginForm: FormGroup | any;
  allUserDetails: any;
  payload: any;
  id: number = 0;
  address: string = '';
  userStatus:any;
  constructor(private FB: FormBuilder, private loginService: LoginService, private route: Router, private http: HttpClient) { }
  ngOnInit() {


    this.loginForm = this.FB.group({
      'email': new FormControl('', [Validators.required, Validators.pattern("([a-zA-Z0-9-_\.]{3,50})@([a-z]{3,100}).([a-z]{3,5})")]),
      'password': new FormControl('', [Validators.required])
    });
    this.loginService.login().subscribe({
      next: (data) => {
        this.allUserDetails = data;
      },
      error: (error) => {
        this.error = error.error;
        console.log(this.error);
      }
    });
  }
  logIn() {
    this.isSubmitted = true
    if (this.loginForm.valid) {
      this.loginService.getUserById(this.loginForm.value, this.allUserDetails).subscribe({
        next: (data) => {
          this.payload = data
          this.payload.IsLoggedIn = true
          if (data.IsLoggedIn) {
            // Navigate to home page
            this.loginService.setAddress(data.addr);
            this.loginService.setLogInDetails(this.payload.IsLoggedIn)
            this.logInChange(this.payload)
            // this.userCheck();
            this.route.navigate(['']);
          }
        },
        error: (error) => {
          this.error = error.error;
          console.log(this.error);
        }
      });
    }

  }
  
  logInChange(payload:any) {
    this.loginService.loginChange( this.payload).subscribe(
      (data:any)=> this.id=data.id
      
    )
  }
  // userCheck(){
  //   this.userStatus=this.loginService.getLoggedInId(this.allUserDetails);
  //   if(this.userStatus){alert('Already Login exists..please Logout and continue');
  //   this.route.navigateByUrl('menu')}else{this.LoginCheck();}
  // }

  //   LoginCheck() {
  //     debugger
  //     this.loginService.login().subscribe(res => {
  //       const user = res.find((a: any) => {
  //         if (a.IsLoggedIn == true) {
  //           return a.mail === this.loginForm.value.mail && a.psd === this.loginForm.value.psd
  //         }
  //         else {
  //           return false
  //         }
  //       });
        
  //       if (user) {
       
  //         alert('you are successfully login');
          
  //         this.route.navigateByUrl('menu');
  //         window.location.reload();
  //         //this.login.reset();
    
  //       } else {
  //         alert('User Not Found');
  //         this.route.navigate(['login']);
  //       }
  //     })
  //   }
}


