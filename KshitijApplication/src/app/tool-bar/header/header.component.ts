import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/order-list/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  loggedin: boolean = false;
  @Output() SideNavToggle = new EventEmitter();

  constructor(private router: Router, private authService: AuthService) {
  }
  ngOnInit(): void {
    this.authService.isUserLoggedIn.subscribe((value) => {
      this.loggedin = value
      console.log(this.loggedin);
    })
    // this.loggedin = this.authService.isLoggedin();
    // console.log(this.loggedin);
  }
  logOut() {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('roles');
    localStorage.removeItem('id');
    this.authService.isUserLoggedIn.next(false);
    this.authService.reloadSubject.next(false);
    this.router.navigate(['login']);
  }

  getLoginStatus() {
  }


  openSidenav() {
    console.log("i am inside");
    this.SideNavToggle.emit();
  }

}