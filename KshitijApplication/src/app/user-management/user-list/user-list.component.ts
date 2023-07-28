
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { UserService } from 'src/app/order-list/services/user.service';
import { NotificationService } from 'src/app/util/services/notification.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent {


  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  Result!: any[];
  NoRecords: boolean = false;
  dataList: any;
  currentUser: any;

  constructor(
    private router: Router,
    private userService: UserService,
    public notificationService: NotificationService,
  ) { }

  displayedColumns: string[] = ['userFirstName', 'userLastName', 'userName', 'role', 'actions'];
  dataSource = new MatTableDataSource<any>();

  ngOnInit() {

    this.getAllActiveLists();

    this.dataSource.filterPredicate = function (data, filter: string): boolean {
      return data.moduleName.toString().toLowerCase().includes(filter) || data.screenName.toString().toLowerCase().includes(filter) ||
        data.featureName.toString().toLowerCase().includes(filter) || data.label.toString().toLowerCase().includes(filter) ||
        data.isActive.toString().toLowerCase().includes(filter)
    };
  }

  getAllActiveLists() {
    this.userService.getAllUsers().subscribe(response => {
      this.dataList = response['result']

      this.dataSource.data = this.dataList;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log(this.dataSource.data)
      console.log(this.dataList)
    }, error => {
      console.log({ error });
      this.notificationService.handleError(error);
    })
  }

  applyFilter(filterValue: any) {
    filterValue.target.value = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    console.log(filterValue)
    this.dataSource.filter = filterValue;

    // const filterValue = (event.target as HTMLInputElement).value;
    // this.dataSource.filter = filterValue.trim().toLowerCase();
    // console.log(this.dataSource)
    // console.log(this.dataSource.filteredData)
    // console.log(this.dataSource.filteredData.length)
    if (this.dataSource.filteredData.length === 0) {
      this.NoRecords = true
    } else {
      this.NoRecords = false
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }
  }

  viewOrEdit(action: any, element: any) {
    this.router.navigate(['user-form'], { queryParams: { action: action, id: element.userName } })
  }

  deleteUser(element: any) {

  }

}