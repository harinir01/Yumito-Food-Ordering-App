import { Injectable } from '@angular/core';
import {CanDeactivate} from '@angular/router';
import { Observable } from 'rxjs';

export interface IDeactivateGuard{
  canExit:() =>boolean ;
}

export class CanDeactivateGuard implements CanDeactivate<IDeactivateGuard> {
  canDeactivate(component: IDeactivateGuard): boolean  {
    return component.canExit();
}
  
}
