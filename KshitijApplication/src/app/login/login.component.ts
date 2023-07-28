import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../order-list/services/auth.service';
import { UserService } from '../order-list/services/user.service';
import { NotificationService } from '../util/services/notification.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private router: Router, private auth: AuthService, private userService: UserService, private notifyService: NotificationService, private authService: AuthService) { }

  ngOnInit(): void {
    this.whereToNavigate();

  }
  username!: String;
  password!: String;
  data!: String;
  role!: String;
  jwtRequest: JwtRequest = { userName: this.username, userPassword: this.password };

  onSubmit(): void {
    console.log(this.jwtRequest);
    this.userService.login(this.jwtRequest).subscribe(
      (data: any) => {
        // if(data==null)
        // {
        // alert("Incorrect email or password")
        // }
        // if(data.role=="admin")
        // {
        // localStorage.setItem('token','ctrhrhrehre');
        // this.router.navigate(['Admin']);
        // alert("Login Successfull as admin")
        // }
        // else {
        // localStorage.setItem('token2','abc');
        // this.router.navigate(['User']);
        // alert("Login Successfull as user")
        // }
        // localStorage.setItem('id',data.id);
        // (err:Error)=>{
        // alert(err.message);
        // }

        console.log(data.user.id);
        localStorage.setItem('roles', JSON.stringify(data.user.role));
        localStorage.setItem('id', JSON.stringify(data.user.userName));
        localStorage.setItem('categoryType', JSON.stringify(data.user.category));
        localStorage.setItem('jwtToken', data.jwtToken);
        const role = data.user.role[0].roleName;
        this.notifyService.showSuccess('Login Successfull', '');
        this.authService.isUserLoggedIn.next(true);
        this.authService.reloadSubject.next(true);
        this.authService.getSidebarDetails();
        this.whereToNavigate();
      },
    );
  }

  onClick() {
    console.log(this.jwtRequest);
  }

  whereToNavigate() {
    if (localStorage.getItem('jwtToken')) {
      if (JSON.parse(localStorage.getItem('roles') || '{}')[0].roleName == "Admin") {
        this.router.navigate(['order-list'])
      }
      if (JSON.parse(localStorage.getItem('roles') || '{}')[0].roleName == "Sales") {
        this.router.navigate(['salesListing'])
      }
      if (JSON.parse(localStorage.getItem('roles') || '{}')[0].roleName == "Manufacturing") {
        this.router.navigate(['manufacturingListing'])
      }
      if (JSON.parse(localStorage.getItem('roles') || '{}')[0].roleName == "User") {
        this.router.navigate(['order-list'])
      }
    }
    else {
      this.authService.isUserLoggedIn.next(false);
    }
  }

  // setemail(event){
  // console.log(event.toElement.value);

  // }
  // setpass(password: String)
  // {
  // this.password=password;
  // }
}
export class User {
  userName!: String;
  userFirstName!: String;
  userLastName!: String;
  userPassword!: String;
  role: Role[];

  constructor(userName: String,
    userFirstName: String,
    userLastName: String,
    userPassword: String,
    role: Role[]) {
    this.userFirstName = this.userFirstName
    this.userLastName = this.userLastName;
    this.userPassword = this.userPassword
    this.role = role;
  }



}

export class JwtRequest {
  userName!: String;
  userPassword!: String;
  constructor(username: String,
    password: String) {
    this.userName = username;
    this.userPassword = password;
  }
}

export class JwtResponse {
  user!: User;
  jwtToken!: String;
  constructor(user: User,
    jwtToken: String) {
    this.user = user;
    this.jwtToken = jwtToken;
  }
}
export class Role {
  roleName!: String;
  roleDiscription!: String;
  constructor(roleName: String,
    roleDiscription: String) {
    this.roleName = roleName;
    this.roleDiscription = roleDiscription;
  }
}