import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  // loggedIn: boolean = false;
  isLoggedIn:boolean=false;
  userId: number = 0;
  address: string = '';
  isLoggedInValue: boolean = false;
  loggedUser: any;
  constructor(private http: HttpClient) {

  }

  setAddress(address: string) {
    this.address = address;
  }
  getAddress() {
    return this.address;
  }
  setLogInDetails(isLoggedIn: boolean) {
    this.isLoggedInValue = isLoggedIn;
    console.warn(this.isLoggedInValue)
  }
  getLogInDetails() {
    return this.isLoggedInValue;
  }
  signUp(registerDetails:any){
    console.log(registerDetails);
    return this.http.post("http://localhost:4001/users", registerDetails)
  }
  login() {
    return this.http.get("http://localhost:4001/users")
  }
  loginChange(payload:any){
    return this.http.put("http://localhost:4001/users/" + payload.id,payload)
  }
  getUserById(loginDetails: any, allUserDetails: any) {
    for (let i = 0; i < allUserDetails.length; i++) {
      if (allUserDetails[i].mail === loginDetails.email && allUserDetails[i].psd === loginDetails.password) {
        this.userId = allUserDetails[i].id;
        return this.http.get<any>("http://localhost:4001/users/" + this.userId)
      }
    }
    alert("User does not found.Please do check the credentials");
    throw Error;
  }
  // details: any
  // getLoggedInId(allDetails: any) {

  //   this.details = allDetails;
  //   for (let i = 0; i < this.details.length; i++) {
  //     if (this.details[i].loggedIn == true) {
  //       this.loggedUser=this.details[i]
  //       this.isLoggedIn=this.loggedUser.loggedIn

  //       return this.details[i]
  //       //this.details[i].loggedIn
        
  //     }
  //     else{
  //       return this.isLoggedIn=false
  //     }
      
  //   }
    
  //   this.isLoggedIn=true
  //   return of(this.isLoggedIn);
  // }
  }
