import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import {  ReactiveFormsModule } from '@angular/forms';
import { CheckoutComponent } from './checkout/checkout.component';
import { InvalidpageComponent } from './invalidpage/invalidpage.component';
import { FooterComponent } from './footer/footer.component';
import { CanDeactivateGuard } from './can-deactivate.guard';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    NavbarComponent,
    RegisterComponent,
    LoginComponent,
    CheckoutComponent,
    InvalidpageComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,ReactiveFormsModule    
  ],
  providers: [CanDeactivateGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
