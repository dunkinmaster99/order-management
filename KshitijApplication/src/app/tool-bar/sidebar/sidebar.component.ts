import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from 'src/app/order-list/services/auth.service';
import { UserService } from 'src/app/order-list/services/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  @Output() closeSideNav = new EventEmitter();
  isAdmin: Boolean = false;
  isSales: Boolean = false
  roles: any;
  isManufacturer: Boolean = false;
  getsidebarPermsissions: any[] = [];

  constructor(private authService: AuthService, private userService: UserService) { }

  onToggleClose() {
    this.closeSideNav.emit();
  }

  ngOnInit() {
    //this.reloadSidebar();
    this.authService.reloadSubject.subscribe((data: any) => {
      this.getsidebarPermsissions = this.authService.fillSideBarValues();
      console.log(this.getsidebarPermsissions);
    })
    this.isAdmin = this.userService.roleMatch(['Admin']);
    console.log(this.isAdmin);
    this.isSales = this.userService.roleMatch(['Sales']);
    console.log(this.isSales);
    this.isManufacturer = this.userService.roleMatch(['Manufacturing']);
    console.log(this.isManufacturer);

  }

  reloadSidebar() {

    location.reload();
  }
}