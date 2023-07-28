import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { KshitijBackendServiceService } from '../order-list/services/kshitij-backend-service.service';
import { NotificationService } from '../util/services/notification.service';
import Swal from 'sweetalert2';
import { TokenStorageService } from '../order-list/services/token-storage.service';
import { AuthService } from '../order-list/services/auth.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { UserService } from '../order-list/services/user.service';

@Component({
  selector: 'app-sales-listing',
  templateUrl: './sales-listing.component.html',
  styleUrls: ['./sales-listing.component.css']
})
export class SalesListingComponent {

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;

  @ViewChild('paginator1') paginator1!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort1!: MatSort;
  displayedColumns1: string[] = ['orderNumber', 'orderId', 'partyName', 'orderDate', 'status', 'actions'];

  displayedColumns: string[] = ['orderNumber', 'orderId', 'actions'];

  ELEMENT_DATA: any[] = [];
  Element_DataNotTally: any[] = [];
  dataSource = new MatTableDataSource<any>(this.ELEMENT_DATA);
  dataSourceNottally = new MatTableDataSource<any>(this.Element_DataNotTally);

  dataList!: any[];
  userList!: any[];
  cols!: any[];
  totalRecords!: number;
  selectedRecord: any
  //public moduleName = 'document'
  public catValueExp = false;
  public catLabelExp = false;
  user: any;
  getsidebarPermsissions: any[] = [];
  myForm!: FormGroup;
  isAdmin: Boolean = false;

  constructor(
    private router: Router,
    private kshitijService: KshitijBackendServiceService,
    public notificationService: NotificationService,
    private tokenStorageService: TokenStorageService, private authService: AuthService,
    private formBuilder: FormBuilder,
    private userService: UserService) { }

  ngOnInit() {
    this.user = localStorage.getItem('id');
    this.isAdmin = this.userService.roleMatch(['Admin']);

    this.user = this.user.replace(/^"(.*)"$/, '$1');
    this.authService.reloadSubject.subscribe((data: any) => {
      this.getsidebarPermsissions = this.authService.fillSideBarValues();
      console.log(this.getsidebarPermsissions);
      this.myForm = this.formBuilder.group({
        userListControl: new FormControl('', []) // Set initial value to null
      });
      this.getUserList();
    })
    this.getALLData()
  }
  getALLData() {
    console.log(this.user);
    if (this.getsidebarPermsissions[0]) {
      this.kshitijService.listAllOrdersResponse().subscribe((response: any) => {
        //this.dataList = response['result'];

        this.dataSource.data = response['result']
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(this.dataSource);


      }, error => {
        console.log({ error });
        this.notificationService.handleError(error);
      });
    }
    else {

      //const param = { isActive: 1 };
      this.kshitijService.listOrderOfSalesUser(this.user).subscribe((response: any) => {
        //this.dataList = response['result'];

        this.dataSource.data = response['result']
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(this.dataSource);


      }, error => {
        console.log({ error });
        this.notificationService.handleError(error);
      });
    }


    this.kshitijService.listAllOrdersNotInTally().subscribe((response: any) => {
      //this.dataList = response['result'];

      this.dataSourceNottally.data = response['result']
      this.dataSourceNottally.paginator = this.paginator1;
      this.dataSourceNottally.sort = this.sort1;
      console.log(this.dataSourceNottally);


    }, error => {
      console.log({ error });
      this.notificationService.handleError(error);
    });


  }

  showOrdersInTally() {

  }
  openForm(action: any, id: any) {
    // var id = 0;
    // if (type == 'update') {
    // if (!this.selectedRecord) {
    // this.notifyService.showError("Please select record.!!", "Error")
    // return false
    // }
    // id = this.selectedRecord
    // }
    const queryData1 = { 'action': action, 'orderId': id };
    this.router.navigate(['order-form'], { queryParams: { ...queryData1 } });
  }
  deleteById(id: any) {

    Swal.fire({
      title: 'Do you want to delete?',
      text: '',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes!',
      cancelButtonText: 'No'
    }).then((result) => {

      // if (result.value) {

      // const payload = { "id": id };
      // this.MastersService.deleteUserSla(payload).subscribe(response => {
      // this.notifyService.showSuccess("Record deleted successfully !!", "Success")
      // this.getALLData()
      // }, error => {
      // console.log({ error });
      // this.notificationService.handleError(error);
      // })
      // } 

    })
    // if (!this.selectedRecord) {
    // this.notifyService.showError("Please select record.!!", "Error")
    // return false
    // }
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    // if(this.dataSource.filteredData.length == null){
    if (this.dataSource.filteredData.length > 0) {
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }

    const filterValue2 = (event.target as HTMLInputElement).value;
    this.dataSourceNottally.filter = filterValue2.trim().toLowerCase();

    // if(this.dataSource.filteredData.length == null){
    if (this.dataSourceNottally.filteredData.length > 0) {
      if (this.dataSourceNottally.paginator) {
        this.dataSourceNottally.paginator.firstPage();
      }
    }
  }

  onEditClick(element: any) {
    console.log(element.target.value);
    this.getRowClass(element.target.value);
  }

  getRowClass(event: any): string {
    if (event === 'low') {
      return 'high-priority-row';
    } else if (event === 'medium') {
      return 'completed-row';
    } else if (event === '') {
      return 'high-priority-row';
    }
    else {
      return '';
    }
  }

  downloadXml() {

    this.kshitijService.downloadFile1().subscribe(
      response => {
        console.log(response.body);
        console.log("success");
        const url = window.URL.createObjectURL(response.body);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'success.xml';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      });

  }
  addInTally(id: any) {
    this.kshitijService.downloadSingleVoucher(id).subscribe(
      (response: any) => {
        console.log(response.text);
        console.log("success");
        const url = window.URL.createObjectURL(response.body);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'success.xml';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      });

  }

  downloadXml2(id: any) {
    this.kshitijService.downloadSingleVoucher(id).subscribe(
      response => {
        console.log(response.body);
        console.log("success");
        const url = window.URL.createObjectURL(response.body);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'success.xml';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      });
  }

  userSelection(data: any) {
    console.log(data);
    console.log(data.target.value);
    let userSelect = data.target.value
    if (data.target.value == '') {
      console.log("inside blanl");
      this.getALLData();
    }
    else {

      this.kshitijService.listOrderOfSalesUser(userSelect).subscribe((response: any) => {
        //this.dataList = response['result'];

        this.dataSource.data = response['result']
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(this.dataSource);


      }, error => {
        console.log({ error });
        this.notificationService.handleError(error);
      });
    }
  }
  getUserList() {
    this.userService.getAllUsers().subscribe(response => {

      console.log(response['result']);
      this.userList = response['result'].filter((item: any) =>
        item.role[0].roleName == 'Sales'
      )
      this.userList = this.userList.map((item: any) => item.userName);
      console.log(this.userList);
    });
  }
}