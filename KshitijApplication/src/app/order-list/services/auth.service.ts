import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { User } from 'src/app/login/login.component';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAdmin: Boolean = false;
  isSales: Boolean = false
  roles: any;
  isManufacturer: Boolean = false;
  getsidebarPermsissions: any[] = [this.isAdmin, this.isSales, this.isManufacturer]

  constructor(private router: Router, private userService: UserService) { }
  setToken(token: string): void {
    localStorage.setItem('token', token);
  }
  public isUserLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  public reloadSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  getToken(): string | null {
    return localStorage.getItem('jwtToken');
  }

  // login(user:User): string{
  // if(user.email=='admin@gmail.com')
  // {
  // return "admin@gmail.com";
  // }
  // else{
  // return "user@gmail.com";}
  // }

  isLoggedin() {

  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['login']);
    this.isUserLoggedIn.next(false);
    this.reloadSubject.next(false);
  }

  getSidebarDetails() {
    this.reloadSubject.subscribe((data: any) => {
      this.fillSideBarValues();
    })
  }

  fillSideBarValues() {
    this.isAdmin = false;
    this.isSales = false;
    this.isManufacturer = false;
    this.isAdmin = this.userService.roleMatch(['Admin']);
    console.log(this.isAdmin);
    this.getsidebarPermsissions[0] = this.isAdmin
    this.isSales = this.userService.roleMatch(['Sales']);
    console.log(this.isSales);
    this.getsidebarPermsissions[1] = this.isSales
    this.isManufacturer = this.userService.roleMatch(['Manufacturing']);
    console.log(this.isManufacturer);
    this.getsidebarPermsissions[2] = this.isManufacturer;
    console.log(this.getsidebarPermsissions);
    return this.getsidebarPermsissions;
  }


}