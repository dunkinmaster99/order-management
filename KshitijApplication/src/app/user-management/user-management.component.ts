import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../order-list/services/user.service';
import { Role } from '../login/login.component';
import { NotificationService } from '../util/services/notification.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
  FormData!: FormGroup;
  roleList: any
  mySet: Role[] = [];
  action: any;
  element: any;
  constructor(private builder: FormBuilder, private userService: UserService, private notifyService: NotificationService, private route: ActivatedRoute) {

  }
  ngOnInit(): void {
    this.initForm();
    this.route.queryParams.subscribe(params => {
      this.action = params['action'];
      this.element = params['id'];
      if (this.action === 'edit' || this.action === 'view') {
        this.userService.getUserById(this.element).subscribe(
          (data: any) => {
            console.log(data);
            this.FormData.controls['firstName'].setValue(data.result.userFirstName);
            this.FormData.controls['lastName'].setValue(data.result.userLastName);
            this.FormData.controls['userName'].setValue(data.result.userName);
            this.FormData.controls['role'].setValue(data.result.role[0].roleName);

            this.FormData.controls['password'].setValue(data.result.userPassword);

          }
        )
      }
    });
    this.userService.getRoles().subscribe(
      (data: any) => {
        this.roleList = data.result;
      }
    )
  }
  initForm() {
    this.FormData = this.builder.group({
      // dealPartyConfigId: new FormControl('', []),
      // dealMasterId: new FormControl('', []),
      // partyMasterId: new FormControl(0, []),
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      role: new FormControl('', [Validators.required]),
      userName: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      subDepartment: new FormControl('', []),

    });
  }

  onSubmit() {

    let data = this.FormData.getRawValue();
    let myRole = this.roleList.filter(
      (single: any) => single.roleName === data.role
    )
    console.log(myRole);
    this.mySet.push(myRole);
    let roleSet = this.mySet
    let payload = {
      userFirstName: data.firstName,
      userLastName: data.lastName,
      userName: data.userName,
      userPassword: data.password,
      role: myRole,
      category: data.subDepartment ? data.subDepartment : null

    }

    this.userService.register1(payload).subscribe(
      (data: any) => {
        console.log(data);
        this.notifyService.showSuccess("Registered Successfully", "")
      }
    )
  }

  goBack() {

  }
}