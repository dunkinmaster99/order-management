import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NotificationService } from '../util/services/notification.service';
import { TokenStorageService } from '../order-list/services/token-storage.service';
import { Router } from '@angular/router';
import { KshitijBackendServiceService } from '../order-list/services/kshitij-backend-service.service';
import Swal from 'sweetalert2';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { elementAt } from 'rxjs';
import { UserService } from '../order-list/services/user.service';

@Component({
  selector: 'app-manufacturing-listing',
  templateUrl: './manufacturing-listing.component.html',
  styleUrls: ['./manufacturing-listing.component.css']
})
export class ManufacturingListingComponent {


  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;

  @ViewChild('paginator1') paginator1!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort1!: MatSort;

  @ViewChild('paginator2') paginator2!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort2!: MatSort;
  displayedColumns1: string[] = ['orderNumber', 'productName', 'quantity', 'properties', 'status', 'actions'];

  displayedColumns: string[] = ['orderNumber', 'orderId', 'actions'];

  ELEMENT_DATA: any[] = [];
  Element_DataNotTally: any[] = [];
  dataSource = new MatTableDataSource<any>(this.ELEMENT_DATA);
  dataSourceNottally = new MatTableDataSource<any>(this.Element_DataNotTally);
  dataSourceChild = new MatTableDataSource<any>(this.ELEMENT_DATA);

  originalStatusMap: Map<number, string> = new Map<number, string>();
  selected = new FormControl(0);



  dataList!: any[];
  cols!: any[];
  totalRecords!: number;
  selectedRecord: any
  //public moduleName = 'document'
  public catValueExp = false;
  public catLabelExp = false;
  categoryType: any;
  myForm!: FormGroup;
  categoryList = [
    { "id": 1, "value": "File" },
    { "id": 2, "value": "Bopp" }
  ]
  showDropdown: boolean = true;
  statusList: any[] = [];
  isAdmin: Boolean = false;

  constructor(
    private router: Router,
    private kshitijService: KshitijBackendServiceService,
    public notificationService: NotificationService,
    private tokenStorageService: TokenStorageService,
    private formBuilder: FormBuilder,
    private userService: UserService) { }

  ngOnInit() {
    this.isAdmin = this.userService.roleMatch(['Admin']);
    this.categoryType = localStorage.getItem('categoryType');
    console.log(this.categoryType);

    this.categoryType = this.categoryType.replace(/^"(.*)"$/, '$1');
    console.log(this.categoryType);
    this.getALLData();
    this.myForm = this.formBuilder.group({
      categoryDepartment: new FormControl('', []),// Set initial value to null
      statusControl: new FormControl('', [])
    });
  }
  getALLData() {
    console.log(this.categoryType);

    this.kshitijService.listAllStatus().subscribe((response: any) => {
      this.statusList = response['result'];
      console.log(this.statusList);
    })

    //const param = { isActive: 1 };
    if (this.categoryType != "null") {
      this.kshitijService.listOrderProductsOfManufacturingCategory(this.categoryType).subscribe((response: any) => {
        //this.dataList = response['result'];

        this.dataSource.data = response['result']

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(this.dataSource);
        for (const element of this.dataSource.data) {
          this.originalStatusMap.set(element.id, element.status);
        }
        console.log(this.originalStatusMap);


      }, error => {
        console.log({ error });
        this.notificationService.handleError(error);
      });
    }
    else {
      this.kshitijService.listOrderProductsNotCompleted().subscribe((response: any) => {
        //this.dataList = response['result'];

        this.dataSource.data = response['result']

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(this.dataSource);
        for (const element of this.dataSource.data) {
          this.originalStatusMap.set(element.id, element.status);
        }
        console.log(this.originalStatusMap);


      }, error => {
        console.log({ error });
        this.notificationService.handleError(error);
      });
    }

    this.kshitijService.listAllUserCatgeories().subscribe((response: any) => {
      //this.dataList = response['result'];

      this.categoryList = response['result'];
      this.categoryList = this.categoryList.filter((data: any) => data.category !== null)
      console.log(this.categoryList);



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


  categorySelection(data: any) {
    console.log(data);
    console.log(data.target.value);
    let categoryTypeSelect = data.target.value
    if (data.target.value == '') {
      console.log("inside blanl");
      this.getALLData();
    }
    else {

      this.kshitijService.listOrderProductsOfManufacturingCategory(categoryTypeSelect).subscribe((response: any) => {
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

  tabSelection(data: any) {
    console.log(data);
    this.getDropdownStatusForTab(data)
  }

  getDropdownStatusForTab(data: any) {
    this.showDropdown = true;
    if (data === 0) {
      this.showDropdown = true;
    }
    if (data === 1) {
      this.showDropdown = false;
    }
  }

  changeStatus(data: any, element: any) {
    console.log(element.id);
    console.log(this.originalStatusMap);
    console.log(data.value);
    const originalStatus = this.originalStatusMap.get(element.id)
    console.log(originalStatus);
    Swal.fire({
      title: 'Confirmation',
      text: 'Are you sure you want to change the status?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        console.log('Perform yes');
        this.kshitijService.changeOrderProductStatus(element.id, data.value).subscribe((data: any) => {
          Swal.fire('Status Changed', 'The status has been changes successfully', 'success');
          this.getALLData();
        });
        (error: any) => {
          Swal.fire('Fail', 'The status change failed!', 'error');
        }
      } else {
        element.status = originalStatus
      }
    });
    console.log(data.value);

  }
}
