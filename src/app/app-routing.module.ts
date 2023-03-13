import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanDeactivateGuard } from './can-deactivate.guard';
import { CheckoutComponent } from './checkout/checkout.component';
import { InvalidpageComponent } from './invalidpage/invalidpage.component';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './service/authguard.guard';

const routes: Routes = [
  {
    path:'',
    component:MenuComponent
  },
  {
    path:'logout',
    component:LoginComponent
  },
  {
    path:'checkout',
    component:CheckoutComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'login',
    component:LoginComponent,
    children:[
      {
        path:'register',
        component:RegisterComponent,
        canDeactivate:[CanDeactivateGuard]
        
      }
    ]
  },
  {
    path:'register',
    component:RegisterComponent,
    canDeactivate:[CanDeactivateGuard]
  },
  {
    path:'menu',
    component:MenuComponent,
  },
  {
    path:'**', 
    component:InvalidpageComponent
  }
];

@NgModule
({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
