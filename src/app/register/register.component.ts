import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../service/login.service';
import { IDeactivateGuard } from '../can-deactivate.guard';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit,IDeactivateGuard {
  constructor(private route: Router, private http: HttpClient,private loginService:LoginService) {
    
  }
  registerForm: FormGroup | any;
  signInUser: any;
  id: number = 0
  error: string = ""
  isSubmitted:boolean=false
  showPassword: boolean=false;
  ngOnInit(): void {
    this.registerForm = new FormGroup({
      'mail': new FormControl('', [Validators.required,  Validators.pattern("([a-zA-Z0-9-_\.]{3,50})@([a-z]{3,100}).([a-z]{3,5})")]),
      'addr': new FormControl('', [Validators.required]),
      'psd': new FormControl('', [Validators.required, Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,15}$")]),

    })
  }
  canExit(){
    if(confirm('Are you sure,you want to Exit?')){
      return true;
    }
      return false;
    
  }
  signUpData(registerForm:FormGroup,isLoggedin:boolean) {
    this.isSubmitted=true;
    if(this.registerForm.valid){  
    console.log(this.registerForm.value);
    this.signInUser = this.registerForm.value.mail
    this.registerForm.value.IsLoggedIn=isLoggedin
    this.loginService.signUp(this.registerForm.value)
      .subscribe({
        next: () => {
          alert('User created successfully');
          this.registerForm.reset();
          this.route.navigate(['login']);
        },
        error: (error) => {
          this.error = error.error;
          console.log(this.error);
          alert('Somthing went wrong');
        }
      });
    }
  }
  login() {
    this.route.navigate(['login']);
  }
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
